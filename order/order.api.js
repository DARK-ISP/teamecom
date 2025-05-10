import express from "express";
import {
  approve,
  createOrder,
  orderById,
  updateProduct,
  validateOrder,
  deleteById,
  orderList,
} from "./order.service.js";
import { isBuyer, isSeller } from "../authentication/user.authentication.js";

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
//order list of specific buyer

export default router; 
