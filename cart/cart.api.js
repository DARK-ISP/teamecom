
import express from "express";
import { isBuyer } from "../authentication/user.authentication.js";
import router from "../seller/seller.api.js";
import { addToCart, cartCount, cartDataValidation, cartList, deleteAll, removeCartById, updateCart, validateUpdateCart } from "./cart.service.js";



router.use(express.Router())


router.post("/add/cart",isBuyer,cartDataValidation,addToCart)

router.post("/update/cart",isBuyer,validateUpdateCart,updateCart)

router.delete("/cart/remove/:id",isBuyer,removeCartById)

router.delete("/cart/flush",isBuyer,deleteAll)

router.get("/cart/list",isBuyer,cartList)

router.get("/cart/count",isBuyer,cartCount)



export default router;



