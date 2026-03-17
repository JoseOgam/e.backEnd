import mongoose from "mongoose";

const cartSchema = mongoose.Schema;

const cartModel = new cartSchema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.cart || mongoose.model("cart", cartModel);

export default Cart;
