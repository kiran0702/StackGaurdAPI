import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoutes from "../routes/analyzeRoutes.js";
import path from "path";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api", analyzeRoutes);

// DB Connection
const connectWithRetry = async () => {
  console.log("Attempting to connect to MongoDB...");
  const connection = await connectDB();
  if (!connection) {
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

// Connect to MongoDB with retry
connectWithRetry();

// Ensure port is correctly set for Render
const PORT = process.env.PORT || 3000;

// Make sure your app listens on the correct port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
