import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
      ref: "buyer",
    },

    productId: 
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    cartQuantity: {
      type: Number,
      required: true,
      min: 1,
      
    },
  },

  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
