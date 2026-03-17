import mongoose from "mongoose";

const paymentSchema = mongoose.Schema;

const paymentModel = new paymentSchema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    method: {
      type: String,
      enum: ["mpesa", "card", "paypal"],
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
    },
    transactionId: Number,
    amount: Number,
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.payment || mongoose.model("payment", paymentModel);
export default Payment;
