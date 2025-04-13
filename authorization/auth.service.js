import User from "../user/user.model.js";
import { generateOTP } from "../utils/otp.js";

export const optGenerator = async (req ,res ,next)=>{

   const forgetEmail = req.body;

   if(!forgetEmail){
    return res.status(400).json({message: "Email is required!!"})
   }

//check email in database 
const user = await User.findOne(forgetEmail)

if(!user){
    return res.status(400).json({message: "invalid credentials!!"})
}

const otp = generateOTP();

console.log(otp)



}