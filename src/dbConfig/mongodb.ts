import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    if (mongoose.connection.readyState === 2) {
      console.log("MongoDB is already connecting...");
      return;
    }

    mongoose.connection.on("connected", () => {
      console.log("mongodb connected successfully");
    });

    mongoose.connection.on("error", (error: any) => {
      console.log("mongo connection error");
      console.error(error);
    });
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error: any) {
    console.error("something went wrong", error.message);
  }
}
