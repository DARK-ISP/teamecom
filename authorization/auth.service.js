import { mailOtp } from "../mail/mailer.js";
import User from "../user/user.model.js";
import { generateJWT } from "../utils/jwt.js";
import { generateOTP } from "../utils/otp.js";
import { Auth } from "./auth.model.js";
import { validateOtpEmail } from "./auth.validation.js";

//email validator
export const otpValidateEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    await validateOtpEmail.validate({ email });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

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
  const email = forgetEmail.email;
  // await mailOtp(forgetEmail.email, token);

  //check if otp already exist with this email

  const existingAuth = await Auth.findOne(forgetEmail);

  if (existingAuth) {
    await Auth.updateOne({ email }, { $set: { token } });
  } else {
    await Auth.create({ email, token });
  }
  setTimeout(async()=>{
    await Auth.deleteOne({email: forgetEmail.email});
console.log("delete data")
  },2*60*1000)

  return res.status(200).json({ message: `OTP ${token} sent to your mail. `  });
};


export const otpCode = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "otp is required!" });
  }


  const authData = await Auth.findOne({ token });

  if (!authData) {
    return res.status(401).json({ message: "Invalid or expired otp!" });
  }

  const user = await User.findOne({ email: authData.email });
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  const email = authData.email;
  const accessToken = await generateJWT(email);

  //delete otp after use
  await Auth.deleteOne({ email: authData.email });

  user.password = undefined
  return res.status(200).json({ data: user, token: accessToken });
};

 export const  regenerateOtp =async(req,res,next)=>{
   
   
  const regenerateOtp = req.body;

  if (!regenerateOtp) {
    return res.status(400).json({ message: "Email is required!!" });
  }

  //check email in database
  const user = await User.findOne(regenerateOtp);

  if (!user) {
    return res.status(400).json({ message: "invalid credentials!!" });
  }

  const token = generateOTP();
  const email = regenerateOtp.email;
  await mailOtp(regenerateOtp.email, token);

  //check if otp already exist with this email

  const existingAuth = await Auth.findOne(regenerateOtp);

  if (existingAuth) {
    await Auth.updateOne({ email }, { $set: { token } });
  } else {
    await Auth.create({ email, token });
  }
  setTimeout(async()=>{
    await Auth.deleteOne({email: regenerateOtp.email});
console.log("delete data")
  },2*60*1000)

  return res.status(200).json({ message: `OTP ${token} sent to your mail. ` });

  
 }


 


 

