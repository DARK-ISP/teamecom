import { hotp, totp } from "otplib";

totp.options= {digits:6, step:0.0001};

export const generateOTP = ()=>{
 
    return totp.generate(process.env.otp_secret);
}

// export const verifyOTP = async(token)=>{
//    const tokenOtp =  totp.verify({token,secret:process.env.otp_secret})
//    return tokenOtp
// }
