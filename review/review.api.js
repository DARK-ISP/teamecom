
import express from "express";
import { deleteReview, getAllReview, review, reviewSummary } from "./review.service.js";
import { isBuyer } from "../authentication/user.authentication.js";

const router = express.Router()

router.get("/review/summary/:id",reviewSummary)
router.post("/product/review/:id",isBuyer,review)
router.delete("/review/delete/:id",isBuyer,deleteReview)
router.get("/review/:id",isBuyer,getAllReview)


export default router


