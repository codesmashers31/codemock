import express from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js"; 
import sessionRoutes from "./routes/sessionRoutes.js"; // New Session Routes
import attachSignaling from "./websocket/signaling.js"; 
import { seedTestSession } from "./services/sessionService.js";

config(); 
await connectDB(); 
// Seeding on startup
await seedTestSession();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expert", expertRoutes);
app.use("/api/meetings", meetingRoutes); // Refined Prefix
app.use("/api/sessions", sessionRoutes); // New Prefix

// Static
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// WebSocket Signaling
attachSignaling(io);

const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
