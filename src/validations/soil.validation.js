// Soil Analysis Validation Schema

const validateCreateSoilAnalysis = (req, res, next) => {
  const { userId, soilData } = req.body;

  // Validate required fields
  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  if (!soilData) {
    return res.status(400).json({ success: false, message: "Soil data is required" });
  }

  if (soilData.pH === undefined || soilData.pH === null) {
    return res.status(400).json({ success: false, message: "pH value is required" });
  }

  if (soilData.pH < 0 || soilData.pH > 14) {
    return res.status(400).json({ success: false, message: "pH value must be between 0 and 14" });
  }

  if (soilData.moisture === undefined || soilData.moisture === null) {
    return res.status(400).json({ success: false, message: "Moisture percentage is required" });
  }

  if (soilData.moisture < 0 || soilData.moisture > 100) {
    return res.status(400).json({ success: false, message: "Moisture must be between 0 and 100" });
  }

  next();
};

const validateUpdateSoilAnalysis = (req, res, next) => {
  const { soilData } = req.body;

  if (soilData) {
    if (soilData.pH !== undefined && (soilData.pH < 0 || soilData.pH > 14)) {
      return res.status(400).json({ success: false, message: "Invalid pH value" });
    }

    if (soilData.moisture !== undefined && (soilData.moisture < 0 || soilData.moisture > 100)) {
      return res.status(400).json({ success: false, message: "Invalid moisture value" });
    }
  }

  next();
};

module.exports = {
  validateCreateSoilAnalysis,
  validateUpdateSoilAnalysis,
};
