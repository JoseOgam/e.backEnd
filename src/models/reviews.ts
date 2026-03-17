import mongoose from "mongoose";

const reviewSchema = mongoose.Schema;

const reviewModel = new reviewSchema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.models.review || mongoose.model("payment", reviewModel);

export default Review;
