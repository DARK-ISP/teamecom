 import { Product } from "../seller/seller.model.js"

export const  getAllProduct= async(req,res,next)=>{

    try {
    const result = await Product.find();
 return res.status(200).json({data:result,message:"success"})
}
catch(err){
    return res.status(400).json({message:err})
}
}





