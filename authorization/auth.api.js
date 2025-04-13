import express from "express";
import { optGenerator } from "./auth.service.js";

const router = express();

router.use(express.Router())
router.post("/forget/otp",optGenerator)



export default router