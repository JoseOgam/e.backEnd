import mongoose from "mongoose";

const orderSchema = mongoose.Schema;

const orderModel = new orderSchema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    ShippingAddress: {
      fullname: String,
      phone: String,
      address: String,
      country: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.orders || mongoose.model("orders", orderModel);

export default Order;
