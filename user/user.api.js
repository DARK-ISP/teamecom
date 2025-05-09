import express from "express";
import { loginDataValidation, loginUser, signupUser, validateUser } from "./user.service.js";


const router = express.Router();

 



router.post("/user/signup",validateUser,signupUser);


router.post("/user/login",loginDataValidation,loginUser)


export default router;


