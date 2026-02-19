const SoilAnalysis = require("../models/soil.model");

// Create Soil Analysis
exports.createSoilAnalysis = async (req, res) => {
  try {
    const { userId, soilData, location, recommendations, notes } = req.body;

    const soilAnalysis = await SoilAnalysis.create({
      userId,
      soilData,
      location,
      recommendations,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Soil analysis created successfully",
      data: soilAnalysis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Soil Analyses
exports.getSoilAnalyses = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};

    const soilAnalyses = await SoilAnalysis.find(filter).populate("userId");

    res.status(200).json({
      success: true,
      data: soilAnalyses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Soil Analysis by ID
exports.getSoilAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    const soilAnalysis = await SoilAnalysis.findById(id).populate("userId");

    if (!soilAnalysis) {
      return res.status(404).json({
        success: false,
        message: "Soil analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      data: soilAnalysis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Soil Analysis by ID
exports.updateSoilAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const { soilData, recommendations, notes } = req.body;

    const soilAnalysis = await SoilAnalysis.findByIdAndUpdate(
      id,
      {
        soilData,
        recommendations,
        notes,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!soilAnalysis) {
      return res.status(404).json({
        success: false,
        message: "Soil analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soil analysis updated successfully",
      data: soilAnalysis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Soil Analysis by ID
exports.deleteSoilAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const soilAnalysis = await SoilAnalysis.findByIdAndDelete(id);

    if (!soilAnalysis) {
      return res.status(404).json({
        success: false,
        message: "Soil analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soil analysis deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
