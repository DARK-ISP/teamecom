import { Product } from "./seller.model.js";
import { validateProduct } from "./seller.validation.js";
//add product validation function
export const addProductValidation = async( req ,res ,next)=>{

    const productData = req.body;
    
    try {
        await validateProduct.validate(productData)
    } catch (error) {
        return res.status(400).json({message: error.message});
        
    }

    next()

}

//add production function 
export const addProduct = async (req,res,next)=>{
    const productData = req.body;
    try{

        const productOwnerId = req.userId
       
        const addProduct = {...productData,productOwnerId}


      const result = await Product.create(addProduct);
     return res.status(200).json({ data: result,message: "product Created Successfuly!!"})
    }
    catch(err)
    {
        return res.status(400).json({message:"Add product failed!!",err})
    }
    



}
export const editProduct= async(req,res,next)=>{
    try{

    }
    catch(err){
        
    }
}





