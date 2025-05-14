import express from "express";
import { isSeller } from "../authentication/user.authentication.js";
import { isOwner } from "../middleware/check.ownership.js";
import { checkMongoIdValidity } from "../utils/mongo.id.validity.js";
import { addProduct, addProductValidation, deleteProduct, editProduct, listProduct, productDetail, } from "./seller.service.js";

import multer from "multer";

const router = express()


router.use(express.Router())



// creating the custom diskStorage in multer

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{

    cb(null,"./public/images")
  }
  ,filename:(req,file,cb)=>{
   
    cb(null,Date.now()+"."+file.originalname.split(".")[1])
  }
})

const upload= multer({storage});

router.post("/product/add",upload.array("images",5),isSeller,addProductValidation,addProduct)


router.put("/product/edit/:id",upload.array("images",5),isSeller,checkMongoIdValidity,isOwner,editProduct)

router.get("/product/list",isSeller,listProduct)

router.get("/product/details/:id",isSeller,checkMongoIdValidity,isOwner,productDetail)

router.delete("/product/delete/:id",isSeller,checkMongoIdValidity,isOwner,deleteProduct)

export default router;

