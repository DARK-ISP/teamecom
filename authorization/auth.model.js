import mongoose from "mongoose";

const authSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token:{
        type: String,
        required:true,
        unique:true,
        trim:true
    }
},
   {
     timestamps:true,
   }
)
export const Auth = mongoose.model("auth",authSchema)