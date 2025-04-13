import express from "express";
import { connectDb } from "./dbConnect.js";
import sellerRouter from "./seller/seller.api.js";
import userRouter from "./user/user.api.js";
import buyerRouter from "./buyer/buyer.api.js";
import otpRouter from "./authorization/auth.api.js";

const app = express();
const port = process.env.port || 8080

app.use(express.json());

app.use((err,req,res,next)=>{
    err= err? err.toString():"something went wrong...";
   return res.status(500).json({message:err})
})

connectDb();
app.use(userRouter);
app.use(sellerRouter);
app.use(buyerRouter);
app.use(otpRouter)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
