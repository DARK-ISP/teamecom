import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
     type: String, 
     trim: true ,
     required: true,
    },
   lastName:{
        type: String,
        trim:true,
        required: true,
    },
 email:{
    type:String,
    trim:true,
    lowercase:true,
    unquie:true,
    required:true,
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
 },
 password:{
    type:String,
    required: true,
    minlength:6,
 },
 roles:{
    type:String,
    enum:["seller","buyer"],
    required:true,
    default:"buyer"
 }
},{
    timestamps:true
});

const User = mongoose.model("user", userSchema);

export default User
