import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Review = mongoose.model("review", reviewSchema);
export default Review;
