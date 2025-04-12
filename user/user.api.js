import express from "express";
import { signupUser, validateUser } from "./user.service.js";


const router = express.Router();

 



router.post("/user/signup",validateUser,signupUser)


export default router;


