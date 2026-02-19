// Guess Farming Validation Schema

const validateGenerateRecommendations = (req, res, next) => {
  const { userId, inputData } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  if (!inputData) {
    return res.status(400).json({ success: false, message: "Input data is required" });
  }

  if (!inputData.farmSize || inputData.farmSize <= 0) {
    return res.status(400).json({ success: false, message: "Valid farm size is required" });
  }

  if (inputData.budget && inputData.budget < 0) {
    return res.status(400).json({ success: false, message: "Budget cannot be negative" });
  }

  next();
};

const validateSelectCrop = (req, res, next) => {
  const { selectedCrop } = req.body;

  if (!selectedCrop) {
    return res.status(400).json({ success: false, message: "Selected crop ID is required" });
  }

  next();
};

module.exports = {
  validateGenerateRecommendations,
  validateSelectCrop,
};
