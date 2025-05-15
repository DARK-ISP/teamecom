import { v4 as uuidv4 } from "uuid";
import { Product } from "../seller/seller.model.js";
import Order from "./order.model.js";
import Stripe from "stripe";
import { response } from "express";

const stripe=new Stripe(process.env.SECRET_KEY)

export const validateOrder = async (req, res, next) => {
  next();
};

export const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
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

  try{
   const payload = req.userId;

    let { limit = 10, page = 1, search = ''} = req.query;

    limit = parseInt(limit);
    page = parseInt(page);
    const skip = (page - 1) * limit;

    const matchStage = {
      productOwnerId: payload
    };

    // Handle isArchived filter
    if (typeof isArchived !== 'undefined') {
      matchStage.isArchived = isArchived === 'true';
    }

    const query = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metaData: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $limit: limit }],
          categorySummary: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 }
              }
            }
          ]
        }
      },
      { $project: { data: 1, metaData: 1 } },
      {
        $addFields: {
          total: {
            $arrayElemAt: ['$metaData.total', 0]
          }
        }
      },
      {
        $project: {
          'data.productOwnerId': 0,
          'data.isArchived': 0,
          metaData: 0
        }
      }
    ];

    const response = await Product.aggregate(query, {
      maxTimeMS: 60000,
      allowDiskUse: true
    });

    return res.status(200).json({ data: response[0] || {} });
  } catch (err) {
    return res.status(400).json({message: err.message});
  }
}


//payment 


export const checkoutPayment= async (req, res) => {
  const product=req.body;
  const response = await stripe.checkout.sessions.create({

    line_items:[
      {
        price_data:{
          currency:"usd",
          product_data:{
            name:product.name
          },
          unit_amount: product.price *100
        },
        quantity:product.quantity
      }
    ],
    mode:"payment",
    success_url:`${process.env.SERVER_URL}/success.html`,
    cancel_url:`${process.env.SERVER_URL}/cancel.html`
  })
  console.log(response)
}
 
// if(!response) {
//   return res.status(400).json({message:"payment request Failed!!"})
// }

// return res.status(200).json({data:{session_id:response.id,session_url:response.url}},{message:"Success"})



