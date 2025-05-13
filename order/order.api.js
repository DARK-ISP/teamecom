import express from "express";
import { isBuyer, isSeller } from "../authentication/user.authentication.js";
import {
  approve,
  checkoutPayment,
  createOrder,
  deleteById,
  orderById,
  orderList,
  updateProduct,
  validateOrder,
} from "./order.service.js";

const router = express();

router.use(express.Router());

//create order 
router.post("/product/order", isBuyer, validateOrder, createOrder);

//update product
router.put("/product/update/:id", isBuyer, updateProduct);
router.get("/product/order/list", isBuyer, orderList);

router.patch("/product/order/:id", isSeller, approve);

router.get("/product/order/:id", isBuyer, orderById);
router.delete("/product/order/:id", isBuyer, deleteById);
router.post("/create-checkout-session",checkoutPayment); //payment
//order list of specific buyer

export default router; 
