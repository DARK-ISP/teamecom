import express from "express"
import { isBuyer } from "../authentication/user.authentication.js";
import {  getAllProduct } from "./buyer.service.js";

const router = express()

router.use(express.Router())


router.get("/buyer/list",isBuyer,getAllProduct);
router.post("/product/feedback",isBuyer);
router.post("/user/location",isBuyer);





export default router;

