import Analyze from "../models/Analyze.js";

// Simple anomaly detection logic (demo-ready)
function compute_risk_score(amount, frequency) {
  let score = 0;
  if (amount > 100) score += 3;
  if (frequency > 5) score += 4;
  // Add more rules as needed
  return Math.min(score, 10);
}

// Add helper functions
function determineSeverity(riskScore) {
  if (riskScore >= 8) return "CRITICAL";
  if (riskScore >= 5) return "HIGH";
  if (riskScore >= 3) return "MEDIUM";
  return "LOW";
}

function determineCategory({ amount, frequency }) {
  if (frequency > 5) return "RAPID-TRANSFERS";
  if (amount > 100) return "HIGH-VALUE";
  return "REGULAR";
}

function calculateConfidence(riskScore) {
  if (riskScore >= 8) return 95;
  if (riskScore >= 5) return 85;
  if (riskScore >= 3) return 70;
  return 60;
}

const analyze = async (req, res) => {
  const { amount = 0, frequency = 0 } = req.body;
  const riskScore = compute_risk_score(amount, frequency);

  const response = {
    risk_score: riskScore,
    severity: determineSeverity(riskScore),
    threat_category: determineCategory({ amount, frequency }),
    confidence_level: calculateConfidence(riskScore),
    threat_detected: riskScore >= 7,
    recommendations:
      riskScore >= 8
        ? "Immediate action required"
        : riskScore >= 5
        ? "Monitor closely"
        : "No action needed",
    timestamp: new Date().toISOString(),
  };

  const newAnalysis = new Analyze({
    amount,
    frequency,
    risk_level: riskScore,
    threat_detected: response.threat_detected,
    recommendations: response.recommendations,
    timestamp: new Date(),
  });

  await newAnalysis.save();

  res.status(200).json(response);
};

export default analyze;
