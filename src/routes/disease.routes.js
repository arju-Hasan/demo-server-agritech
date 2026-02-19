const express = require("express");
const router = express.Router();

const {
  detectDisease,
  getDiseaseDetections,
  getDiseaseById,
  updateDiseaseResults,
  markAsResolved,
  startTreatment,
} = require("../controllers/disease.controller");

router.post("/", detectDisease);
router.get("/", getDiseaseDetections);
router.get("/:id", getDiseaseById);
router.patch("/:id/results", updateDiseaseResults);
router.patch("/:id/start-treatment", startTreatment);
router.patch("/:id/resolve", markAsResolved);

module.exports = router;
