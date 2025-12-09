// server.js
import express from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";

config(); // load .env
await connectDB(); // ensure connectDB exports an async function or returns a promise

const app = express();

app.use(cors());
app.use(express.json());

// serve uploaded images (dev)
app.use("/uploads/profileImages", express.static(path.join(process.cwd(), "uploads/profileImages")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// mount routers
app.use("/api/auth", authRoutes);
app.use("/api/expert", expertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
