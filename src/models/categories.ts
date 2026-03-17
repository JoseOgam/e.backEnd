import mongoose from "mongoose";

const categorySchema = mongoose.Schema;

const categoryModel = new categorySchema({
  name: String,
  slug: String,
});

const Category =
  mongoose.models.categories || mongoose.model("categories", categoryModel);
export default Category;
