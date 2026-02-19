const CropRecommendation = require("../models/cropRecommendation.model");
const Crop = require("../models/crop.model");

// Generate Recommendations
exports.generateRecommendations = async (req, res) => {
  try {
    const { userId, inputData } = req.body;

    // Create recommendation record
    const recommendation = await CropRecommendation.create({
      userId,
      inputData,
      status: "pending",
    });

    // In a real scenario, call ML service to generate recommendations
    // For now, we'll return the created record
    res.status(201).json({
      success: true,
      message: "Crop recommendations generated",
      data: recommendation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Recommendation by ID
exports.getRecommendationById = async (req, res) => {
  try {
    const { id } = req.params;

    const recommendation = await CropRecommendation.findById(id)
      .populate("userId")
      .populate("recommendedCrops.cropId");

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Select Crop from Recommendations
exports.selectCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedCrop } = req.body;

    const recommendation = await CropRecommendation.findByIdAndUpdate(
      id,
      {
        selectedCrop,
        status: "selected",
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop selected successfully",
      data: recommendation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Recommendation History
exports.getRecommendationHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    const recommendations = await CropRecommendation.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Recommendation as Completed
exports.completeRecommendation = async (req, res) => {
  try {
    const { id } = req.params;

    const recommendation = await CropRecommendation.findByIdAndUpdate(
      id,
      {
        status: "completed",
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recommendation marked as completed",
      data: recommendation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
