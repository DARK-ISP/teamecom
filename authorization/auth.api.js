import express from "express";
import { optGenerator, otpCode, otpValidateEmail } from "./auth.service.js";

const router = express();

router.use(express.Router())

//forget password api
router.post("/forget/otp",otpValidateEmail,optGenerator);


//login api with verify code 

router.post("/login/otp",otpCode)



export default router