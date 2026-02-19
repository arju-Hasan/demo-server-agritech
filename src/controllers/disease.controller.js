const DiseaseDetection = require("../models/diseaseDetection.model");

// Detect Disease (from image)
exports.detectDisease = async (req, res) => {
  try {
    const { userId, cropMonitoringId, cropName, location, imageUrl } =
      req.body;

    const detection = await DiseaseDetection.create({
      userId,
      cropMonitoringId,
      cropName,
      location,
      imageUrl,
      status: "detected",
    });

    // In a real scenario, call ML/AI service to analyze image
    // For now, we're just storing the detection record

    res.status(201).json({
      success: true,
      message: "Disease detection record created",
      data: detection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Disease Detections
exports.getDiseaseDetections = async (req, res) => {
  try {
    const { userId, status } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    if (status) filter.status = status;

    const detections = await DiseaseDetection.find(filter)
      .populate("userId")
      .populate("cropMonitoringId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: detections.length,
      data: detections,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Disease Detection by ID
exports.getDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const detection = await DiseaseDetection.findById(id)
      .populate("userId")
      .populate("cropMonitoringId");

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Disease detection not found",
      });
    }

    res.status(200).json({
      success: true,
      data: detection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Disease Detection with Results
exports.updateDiseaseResults = async (req, res) => {
  try {
    const { id } = req.params;
    const { detectionResults, treatment } = req.body;

    const detection = await DiseaseDetection.findByIdAndUpdate(
      id,
      {
        detectionResults,
        treatment,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Disease detection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Disease detection updated successfully",
      data: detection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Disease as Resolved
exports.markAsResolved = async (req, res) => {
  try {
    const { id } = req.params;
    const { treatmentCompletionDate, notes } = req.body;

    const detection = await DiseaseDetection.findByIdAndUpdate(
      id,
      {
        status: "resolved",
        treatmentCompletionDate,
        ...(notes && { notes }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Disease detection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Disease marked as resolved successfully",
      data: detection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Start Treatment
exports.startTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    const detection = await DiseaseDetection.findByIdAndUpdate(
      id,
      {
        status: "under_treatment",
        treatmentStartDate: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Disease detection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Treatment started successfully",
      data: detection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
