import mongoose from "mongoose";

const AnalyzeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  risk_level: {
    type: Number,
    required: true,
  },
  threat_detected: {
    type: Boolean,
    required: true,
  },
  recommendations: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model("Analyze", AnalyzeSchema);
