import mongoose from "mongoose";
import config from "../app/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🔥 MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
