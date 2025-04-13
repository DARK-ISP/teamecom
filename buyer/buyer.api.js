import express from "express"
import { isBuyer } from "../authentication/user.authentication.js";

const router = express()

router.use(express.Router())


router.post("/product/list",isBuyer);

router.post("/add/cart",isBuyer);

router.post("/product/feedback",isBuyer);

router.post("/user/location",isBuyer);

router.post("/product/order",isBuyer);



export default router;

