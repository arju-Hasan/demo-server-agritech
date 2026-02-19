const CropMonitoring = require("../models/cropMonitoring.model");

// Create Monitoring Record
exports.createMonitoring = async (req, res) => {
  try {
    const { userId, cropId, cropName, farmSize, plantingDate, location } =
      req.body;

    const monitoring = await CropMonitoring.create({
      userId,
      cropId,
      cropName,
      farmSize,
      plantingDate,
      location,
      status: "planning",
    });

    res.status(201).json({
      success: true,
      message: "Crop monitoring created successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Monitoring Records
exports.getAllMonitoring = async (req, res) => {
  try {
    const { userId, status } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    if (status) filter.status = status;

    const monitorings = await CropMonitoring.find(filter)
      .populate("userId")
      .populate("cropId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: monitorings.length,
      data: monitorings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Monitoring by ID
exports.getMonitoringById = async (req, res) => {
  try {
    const { id } = req.params;

    const monitoring = await CropMonitoring.findById(id)
      .populate("userId")
      .populate("cropId");

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Activity to Monitoring
exports.addActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, description, details } = req.body;

    const monitoring = await CropMonitoring.findByIdAndUpdate(
      id,
      {
        $push: {
          activities: {
            date: new Date(),
            type,
            description,
            details,
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity added successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Growth Stage
exports.updateGrowthStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { growthStage, healthStatus } = req.body;

    const monitoring = await CropMonitoring.findByIdAndUpdate(
      id,
      {
        growthStage,
        ...(healthStatus && { healthStatus }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Growth stage updated successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Record Harvest
exports.recordHarvest = async (req, res) => {
  try {
    const { id } = req.params;
    const { harvestDate, totalYield, yieldUnit, quality, notes } = req.body;

    const monitoring = await CropMonitoring.findByIdAndUpdate(
      id,
      {
        harvestRecord: {
          harvestDate,
          totalYield,
          yieldUnit,
          quality,
          notes,
        },
        status: "completed",
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Harvest recorded successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Monitoring Record (detailed monitoring data)
exports.addMonitoringRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { moisture, temperature, plantHeight, leafColor, pestObserved, diseaseObserved, notes } = req.body;

    const monitoring = await CropMonitoring.findByIdAndUpdate(
      id,
      {
        $push: {
          monitoringRecords: {
            date: new Date(),
            moisture,
            temperature,
            plantHeight,
            leafColor,
            pestObserved,
            diseaseObserved,
            notes,
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Monitoring data added successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, description, itemsBought } = req.body;

    const monitoring = await CropMonitoring.findByIdAndUpdate(
      id,
      {
        $push: {
          expenses: {
            date: new Date(),
            category,
            amount,
            description,
            itemsBought,
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!monitoring) {
      return res.status(404).json({
        success: false,
        message: "Monitoring record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense added successfully",
      data: monitoring,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
