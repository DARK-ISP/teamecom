 import jwt from "jsonwebtoken";
 
export const generateJWT=async(payload)=>{
return await jwt.sign(
    {
        data:payload
    },process.env.key,{
        expiresIn:'24h'
    }
)
}
export const verifyJWT=(token)=>{
    try{
        return jwt.verify(token,process.env.key);
 }
 catch(err){
    throw new Error("unauthorized access");
 }
}


