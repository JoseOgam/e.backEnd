import mongoose from "mongoose";
const productSchema = mongoose.Schema;

const productsModel = new productSchema(
  {
    name: String,
    description: String,
    price: Number,
    discountedPrice: Number,
    stock: Number,
    imags: [String],
    categoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    rating: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.products || mongoose.model("products", productsModel);

export default Product;
