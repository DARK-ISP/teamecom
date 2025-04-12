import express from "express"
import { isSeller } from "../authentication/user.authentication.js";
import { addProduct, addProductValidation } from "./seller.service.js";

const router = express()

router.use(express.Router())

router.post("/product/add",isSeller,addProductValidation,addProduct)



export default router;

