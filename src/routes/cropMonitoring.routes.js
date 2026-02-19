const express = require("express");
const router = express.Router();

const {
  createMonitoring,
  getAllMonitoring,
  getMonitoringById,
  addActivity,
  updateGrowthStage,
  recordHarvest,
  addMonitoringRecord,
  addExpense,
} = require("../controllers/cropMonitoring.controller");

router.post("/", createMonitoring);
router.get("/", getAllMonitoring);
router.get("/:id", getMonitoringById);
router.patch("/:id/activity", addActivity);
router.patch("/:id/growth-stage", updateGrowthStage);
router.patch("/:id/harvest", recordHarvest);
router.patch("/:id/monitoring-record", addMonitoringRecord);
router.patch("/:id/expense", addExpense);

module.exports = router;
