import mongoose from "mongoose";

const addressSchema = mongoose.Schema;

const addressModel = new addressSchema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: String,
  phone: String,
  address: String,
  city: String,
  country: String,
});

const Address =
  mongoose.models.address || mongoose.model("address", addressModel);

export default Address;
