import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Remove deprecated options (useNewUrlParser, useUnifiedTopology)
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Add error handlers for connection issues
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    return conn;
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    // Don't exit process immediately, allow for retry logic
    return null;
  }
};

export default connectDB;
