import express from "express"
import { isSeller } from "../authentication/user.authentication.js";
import { addProduct, addProductValidation, deleteProduct, editProduct, productDetail,  } from "./seller.service.js";
import { isOwner } from "../middleware/check.ownership.js";
import { checkMongoIdValidity } from "../utils/mongo.id.validity.js";

const router = express()

router.use(express.Router())

router.post("/product/add",isSeller,addProductValidation,addProduct)


router.put("/product/edit/:id",isSeller,checkMongoIdValidity,isOwner,editProduct)

router.get("/product/details/:id",isSeller,checkMongoIdValidity,isOwner,productDetail)

router.delete("/product/delete/:id",isSeller,checkMongoIdValidity,isOwner,deleteProduct)

export default router;

