import mongoose from "mongoose"


export const checkMongoIdValidity = async(req ,res ,next)=>{
    const checkMongoId = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!checkMongoId){
        return res.status(400).json({message: "Invalid id!!"})
    }
next()
}
