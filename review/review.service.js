import mongoose from "mongoose";
import { checkMongoIdValidity } from "../utils/mongo.id.validity.js";
import Review from "./review.model.js";

export const review = async(req ,res )=>{

try {
    req.body.buyerId = req.userId
    const productId =  req.params.id
  
      console.log(productId);
    console.log( {...req.body});
  
       if(!productId){
           return res.status(400).json({message: "Invalid id!"});
       }
  
       const result = await Review.create({...req.body})
      
} catch (error) {
    return res.status(400).json({message: error.message})
}
}
 
export const getAllReview=async(req,res)=>{
 const productId= req.params.id
console.log(productId);
 try{

    const result= await Review.find({productId})
    console.log(result)
    
 }
 catch(err){

    return res.status(500).json({message:"Something went wrong!!",err})
 }


    
}
export const ReviewById=async(req,res)=>{
 const ReviewId=req.params.id;
 try{

    const result= await Review.find({ReviewId})
    console.log(result)
    
 }
 catch(err){

    return res.status(500).json({message:"Something went wrong!!",err})
 }


    
}
export const deleteReview =async(req,res)=>{
  const ReviewId= req.params.id;
  try{

    //check review
    const review = await Review.findOne({_id: ReviewId}) 
   console.log(req.userId,review.buyerId);
    if(review.buyerId.toString()=== req.userId.toString()){
     
        const response = await Review.findByIdAndDelete({_id:ReviewId})
        return res.status(200).json({message:response})
    }

    return res.status(403).json({message:"Not authorized to delete this review"}); 

  }catch(err){
   return res.status(500).json({message:"Review not found!"})
  }

}

export const reviewSummary=async(req,res)=>{
   try{
      const response= await Review.find()
   }catch(error){

   }
}

 
