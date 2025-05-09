import mongoose from "mongoose";
import { Product } from "../seller/seller.model.js";
import Cart from "./cart.model.js";
import { cartIncValidate, cartValidation } from "./cart.validation.js";

export const cartDataValidation = async (req, res, next) => {
  const cartData = req.body;
  try {
    await cartValidation.validate(cartData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  //extract buyer id

  try {
    const buyerId = req.userId;

    //check product existence

    const productExistence = await Product.findOne({ _id: productId });

    if (!productExistence) {
      return res.status(404).json({ message: "product not exist!" });
    }

    //check cart data existence

    const cartData = await Cart.findOne({
      productId: productId,
      buyerId: buyerId,
    });
    if (cartData) {
      return res
        .status(400)
        .json({ message: "product already added in cart " });
    }

    //compare product actual quantity or cart quantity which given by user

    if (quantity > productExistence.quantity) {
      return res.status(400).json({ message: "product out of stock!" });
    }

    const cart = { productId, cartQuantity: quantity, buyerId };
    console.log(cart);

    await Cart.create(cart);

    return res.status(200).json({ message: "cart added successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const validateUpdateCart = async (req, res, next) => {
  const data = req.body;

  try {
    await cartIncValidate.validate(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export const updateCart = async (req, res, next) => {
  const { productId, action } = req.body;
  const buyerId = req.userId;
  try {
    const cartData = await Cart.findOne({ productId, buyerId });

    // checking whether the product exist in cart

    if (!cartData) {
      return res.status(400).json({ message: "product doesn't exist in cart" });
    }
    const productExist = await Product.findById(productId);

    // checking whether product is available in cart

    if (!productExist) {
      return res.status(400).json({ message: "product is not available" });
    }

    const totalQuantity =
      action === "inc" ? cartData.cartQuantity + 1 : cartData.cartQuantity - 1;

    // condition for least quantity

    if (totalQuantity < 1) {
      return res
        .status(400)
        .json({ message: "product quantity should be at least 1" });
    }

    // checking if the cart quantity exceeds  the available product

    if (totalQuantity > productExist.quantity) {
      return res.status(400).json({ message: "product limit exeeds" });
    }
    const result = await Cart.findOneAndUpdate(
      cartData._id,
      {
        productId: productId,
        cartQuantity: totalQuantity,
        buyerId: buyerId,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const removeCartById = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const buyerId = req.userId;
    console.log(cartId);

    const result = await Cart.deleteOne({ _id: cartId, buyerId: buyerId });
    return res.status(200).json({ message: "delete successfully." });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const deleteAll = async (req, res, next) => {
  try {
    const buyerId = req.userId;
    const result = await Cart.deleteMany({ buyerId: buyerId });
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const cartList = async (req, res) => {
  const data = await Cart.aggregate(
    [
      {
        $match: {
          buyerId: req.userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "data",
        },
      },
      { $unwind: { path: "$data" } },
      {
        $project: {
          productId: 1,
          cartQuantity: 1,
          price: "$data.price",
          productName: "$data.productName",
          category: "$data.category",
          brand: "$data.brand",
        },
      },
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
  );

  return res.status(200).json({ data: data });
};

export const cartCount = async (req, res) => {
  try {
    const buyerId = req.userId;
    console.log(buyerId);
    const allProduct = await Cart.find({ buyerId: buyerId });
    const totalReduce = allProduct.reduce(
      (accumulator, currentvalue) => accumulator + currentvalue.cartQuantity,
      0
    );

    console.log(totalReduce);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
