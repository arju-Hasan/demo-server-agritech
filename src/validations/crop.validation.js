// Crop Validation Schema

const validateCreateCrop = (req, res, next) => {
  const { name, cropCategory, season } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ success: false, message: "Crop name is required" });
  }

  if (!cropCategory) {
    return res.status(400).json({ success: false, message: "Crop category is required" });
  }

  const validCategories = ["cereal", "pulse", "vegetable", "fruit", "spice", "herb"];
  if (!validCategories.includes(cropCategory)) {
    return res.status(400).json({ success: false, message: "Invalid crop category" });
  }

  if (!season) {
    return res.status(400).json({ success: false, message: "Season is required" });
  }

  const validSeasons = ["kharif", "rabi", "summer", "winter"];
  if (!validSeasons.includes(season)) {
    return res.status(400).json({ success: false, message: "Invalid season" });
  }

  next();
};

const validateUpdateCrop = (req, res, next) => {
  const { cropCategory, season } = req.body;

  if (cropCategory) {
    const validCategories = ["cereal", "pulse", "vegetable", "fruit", "spice", "herb"];
    if (!validCategories.includes(cropCategory)) {
      return res.status(400).json({ success: false, message: "Invalid crop category" });
    }
  }

  if (season) {
    const validSeasons = ["kharif", "rabi", "summer", "winter"];
    if (!validSeasons.includes(season)) {
      return res.status(400).json({ success: false, message: "Invalid season" });
    }
  }

  next();
};

module.exports = {
  validateCreateCrop,
  validateUpdateCrop,
};
