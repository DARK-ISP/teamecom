
import express from "express";
import { deleteReview, getAllReview, review } from "./review.service.js";
import { isBuyer } from "../authentication/user.authentication.js";

const router = express.Router()

router.post("/product/review/:id",isBuyer,review)

//get all review 
router.get("/review/:id",isBuyer,getAllReview)

//delete review 
router.delete("/review/delete/:id",isBuyer,deleteReview)




export default router


