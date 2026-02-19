const Crop = require("../models/crop.model");

// Get All Crops
exports.getAllCrops = async (req, res) => {
  try {
    const { category, season, isActive } = req.query;
    const filter = {};
    
    if (category) filter.cropCategory = category;
    if (season) filter.season = season;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const crops = await Crop.find(filter);

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Crop by ID
exports.getCropById = async (req, res) => {
  try {
    const { id } = req.params;

    const crop = await Crop.findById(id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Crop (Admin only)
exports.createCrop = async (req, res) => {
  try {
    const {
      name,
      bannedName,
      description,
      cropCategory,
      season,
      climate,
      soilRequirements,
      growthStages,
      harvestingInfo,
      commonPests,
      commonDiseases,
      marketPrice,
      image,
    } = req.body;

    const crop = await Crop.create({
      name,
      bannedName,
      description,
      cropCategory,
      season,
      climate,
      soilRequirements,
      growthStages,
      harvestingInfo,
      commonPests,
      commonDiseases,
      marketPrice,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Crop created successfully",
      data: crop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Crop (Admin only)
exports.updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    const crop = await Crop.findByIdAndUpdate(id, updateData, { new: true });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      data: crop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Crop (Admin only)
exports.deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;

    const crop = await Crop.findByIdAndDelete(id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
