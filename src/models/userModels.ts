import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide username"],
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please provide password"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // user → normal customer
    // admin → manages orders & products
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordTokenExpiry: {
      type: Date,
    },

    verifyToken: {
      type: String,
    },

    verifyTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
