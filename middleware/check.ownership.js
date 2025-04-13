import { Product } from "../seller/seller.model.js";

export const isOwner = async(req ,res ,next)=>{

    const productId = req.params.id ;

    const userId = req.userId;

    //check product existence 

    const checkProduct = await Product.findById(productId);

    if(!checkProduct){
        return res.status(400).json({message: "product not found!!"})
    }

    //check ownership 

    const check = userId.equals(checkProduct.productOwnerId)

    if(!check){
        return res.status(400).json({message: "you are not allowed to edit"})
    }
next();

}





