import {totp} from "otplib";

totp.options= {digits:6, step:90};

export const generateOTP = ()=>{
 
    return totp.generate(toString(process.env.secretOtpKey));
}

export const verifyOTP=(token)=>{
    return totp.verify({token,secret:process.env.secretOtpKey})
}