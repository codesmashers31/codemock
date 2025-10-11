import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import { configDotenv } from "dotenv";
import cors from "cors"

// Connect to MongoDB
configDotenv();

connectDB();

const app = express();
app.use(cors())


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});