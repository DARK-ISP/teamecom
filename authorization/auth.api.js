import express from "express";
import { optGenerator, otpCode, otpValidateEmail, regenerateOtp } from "./auth.service.js";

const router = express();

router.use(express.Router())

//forget password api
router.post("/forget/otp",otpValidateEmail,optGenerator);


//login api with verify code 

router.post("/login/otp",otpCode)

//resend api 
router.post("/otp/resend",regenerateOtp)



export default router