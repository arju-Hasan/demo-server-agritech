const express = require("express");
const router = express.Router();

const {
  createSoilAnalysis,
  getSoilAnalyses,
  getSoilAnalysisById,
  updateSoilAnalysis,
  deleteSoilAnalysis,
} = require("../controllers/soil.controller");

router.post("/", createSoilAnalysis);
router.get("/", getSoilAnalyses);
router.get("/:id", getSoilAnalysisById);
router.patch("/:id", updateSoilAnalysis);
router.delete("/:id", deleteSoilAnalysis);

module.exports = router;
