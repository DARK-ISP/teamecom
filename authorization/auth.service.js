import { mailOtp } from "../mail/mailer.js";
import User from "../user/user.model.js";
import { generateOTP } from "../utils/otp.js";
import { Auth } from "./auth.model.js";

export const optGenerator = async (req, res, next) => {
  const forgetEmail = req.body;

  if (!forgetEmail) {
    return res.status(400).json({ message: "Email is required!!" });
  }

  //check email in database
  const user = await User.findOne(forgetEmail);

  if (!user) {
    return res.status(400).json({ message: "invalid credentials!!" });
  }

  const token = generateOTP();
const email = forgetEmail.email
 await mailOtp(forgetEmail.email, token);

 
 //check if otp already exist with this email 

 const existingAuth = await Auth.findOne(forgetEmail);

 if(existingAuth)
{
    await Auth.updateOne({email},{$set:{token}})
}
else{
    await Auth.create({email,token})
}
return res.status(200).json({message: "OTP sent to your mail. "});

};
