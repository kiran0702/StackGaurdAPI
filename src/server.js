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


// Ensure port is correctly set for Render
const PORT = process.env.PORT || 3000;

// Make sure your app listens on the correct port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
