import mongoose from "mongoose";

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;  // ✅ get from .env
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB Atlas connected!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;
