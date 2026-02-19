// Disease Detection Validation Schema

const validateDetectDisease = (req, res, next) => {
  const { userId, imageUrl } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  if (!imageUrl) {
    return res.status(400).json({ success: false, message: "Image URL is required" });
  }

  // Validate URL format
  try {
    new URL(imageUrl);
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid image URL format" });
  }

  next();
};

const validateUpdateDiseaseResults = (req, res, next) => {
  const { detectionResults } = req.body;

  if (!detectionResults) {
    return res.status(400).json({ success: false, message: "Detection results are required" });
  }

  if (detectionResults.confidence !== undefined && 
      (detectionResults.confidence < 0 || detectionResults.confidence > 1)) {
    return res.status(400).json({ success: false, message: "Confidence must be between 0 and 1" });
  }

  next();
};

const validateMarkAsResolved = (req, res, next) => {
  const { treatmentCompletionDate } = req.body;

  if (treatmentCompletionDate) {
    const completionDate = new Date(treatmentCompletionDate);
    if (isNaN(completionDate.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid completion date" });
    }
  }

  next();
};

module.exports = {
  validateDetectDisease,
  validateUpdateDiseaseResults,
  validateMarkAsResolved,
};
