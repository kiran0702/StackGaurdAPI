import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoutes from "../routes/analyzeRoutes.js";
import path from "path";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api", analyzeRoutes);

// DB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;


mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
