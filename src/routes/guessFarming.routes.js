const express = require("express");
const router = express.Router();

const {
  generateRecommendations,
  getRecommendationById,
  selectCrop,
  getRecommendationHistory,
  completeRecommendation,
} = require("../controllers/guessFarming.controller");

router.post("/", generateRecommendations);
router.get("/history", getRecommendationHistory);
router.get("/:id", getRecommendationById);
router.patch("/:id/select", selectCrop);
router.patch("/:id/complete", completeRecommendation);

module.exports = router;
