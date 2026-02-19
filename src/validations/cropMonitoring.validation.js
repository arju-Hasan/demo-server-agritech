// Crop Monitoring Validation Schema

const validateCreateMonitoring = (req, res, next) => {
  const { userId, cropId, plantingDate } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  if (!cropId) {
    return res.status(400).json({ success: false, message: "Crop ID is required" });
  }

  if (!plantingDate) {
    return res.status(400).json({ success: false, message: "Planting date is required" });
  }

  const plantDate = new Date(plantingDate);
  if (isNaN(plantDate.getTime())) {
    return res.status(400).json({ success: false, message: "Invalid planting date" });
  }

  next();
};

const validateAddActivity = (req, res, next) => {
  const { type, description } = req.body;

  if (!type) {
    return res.status(400).json({ success: false, message: "Activity type is required" });
  }

  if (!description) {
    return res.status(400).json({ success: false, message: "Activity description is required" });
  }

  next();
};

const validateRecordHarvest = (req, res, next) => {
  const { totalYield, yieldUnit } = req.body;

  if (totalYield === undefined || totalYield === null) {
    return res.status(400).json({ success: false, message: "Total yield is required" });
  }

  if (totalYield < 0) {
    return res.status(400).json({ success: false, message: "Yield cannot be negative" });
  }

  if (!yieldUnit) {
    return res.status(400).json({ success: false, message: "Yield unit is required" });
  }

  next();
};

module.exports = {
  validateCreateMonitoring,
  validateAddActivity,
  validateRecordHarvest,
};
