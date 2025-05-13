import express from "express";
import { connectDb } from "./dbConnect.js";
import sellerRouter from "./seller/seller.api.js";
import userRouter from "./user/user.api.js";
import buyerRouter from "./buyer/buyer.api.js";
import otpRouter from "./authorization/auth.api.js";
import cartRouter from"./cart/cart.api.js";
import orderRouter from "./order/order.api.js";
import reviewRouter from "./review/review.api.js";
// memory storage by default




const app = express();
const port = process.env.port || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use((err,req,res,next)=>{
    err= err? err.toString():"something went wrong...";
   return res.status(500).json({message:err})
})





app.post("/data", (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ message: "Data received successfully" });
}
);






connectDb();
app.use(userRouter);
app.use(sellerRouter);
app.use(buyerRouter);
app.use(otpRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(reviewRouter);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
// console.log(`http://0.0.0.0/${port}`);
})
