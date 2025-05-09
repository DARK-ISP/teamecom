import { v4 as uuidv4 } from "uuid";
import { Product } from "../seller/seller.model.js";
import Order from "./order.model.js";

export const validateOrder = async (req, res, next) => {
  next();
};

export const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    console.log(req.userId);
    orderData.buyerId = req.userId;
    orderData.id = uuidv4();
    const products = orderData?.products;
    const data = products.map(async (product) => {
      const { productId, quantity } = product;
      const result = await Product.findOne({ _id: productId });
      if (!result) {
        return res.status(400).json({ message: "Product not exist" });
      }
      const update = await Product.updateOne(
        { _id: productId },
        { $set: { quantity: result?.quantity - quantity } }
      );
    });
    console.log(orderData);
    await Order.create(orderData);
    return res.status(200).json({ data: orderData });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const productEditData = req.body;

  //distruct

  //check order id existence

  const check = await Order.findOne({ id: productId });

  if (!check) {
    return res.status(404).json({ message: "Order not found!" });
  }

  const update = await Order.updateOne(
    { id: productId },

    {
      $set: {
        address: productEditData.address,
      },
    }
  );
  if (update) {
    return res.status(200).json({ message: "updated!" });
  } else {
    return res.status(200).json({ message: "product update failed" });
  }
};

export const approve = async (req, res) => {
  const response = await Order.updateOne(
    { id: req.params.id },
    {
      $set: {
        isApproved: Boolean(true),
      },
    }
  );
  console.log(response);
};

//order detail individual

export const orderById = async (req, res) => {
  const orderId = req.params.id;

  const data = await Order.findOne({ id: orderId });

  return res.status(200).json({ data: data });
};

export const deleteById = async (req, res) => {
  const orderId = req.params.id;

  const checkOrderId = await Order.findOne({ id: orderId });
  if (!checkOrderId) {
    return res.status(404).json({ message: "order not found!" });
  }

  //delete product

  const deleteById = await Order.deleteOne({ id: orderId });

  if (deleteById) {
    return res.status(200).json({ message: "deleted.." });
  }
  return res.status(400).json({ message: "Something went wrong!" });
};

export const orderList = async (req, res) => {
  const id = req.userId;
  const result = await Order.find({ buyerId: id });

  if (result) {
    return res.status(200).json({ data: result });
  } else {
    return res.status(200).json("something went worng");
  }
};





