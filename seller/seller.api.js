import express from "express";
import { isSeller } from "../authentication/user.authentication.js";
import { isOwner } from "../middleware/check.ownership.js";
import { checkMongoIdValidity } from "../utils/mongo.id.validity.js";
import { addProduct, addProductValidation, deleteProduct, editProduct, productDetail, } from "./seller.service.js";

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


router.put("/product/edit/:id",isSeller,checkMongoIdValidity,isOwner,editProduct)

router.get("/product/list",isSeller)

router.get("/product/details/:id",isSeller,checkMongoIdValidity,isOwner,productDetail)

router.delete("/product/delete/:id",isSeller,checkMongoIdValidity,isOwner,deleteProduct)

export default router;

