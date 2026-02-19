const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getProductReviews,
} = require("../controllers/review.controller");

// Public routes
router.get("/", getReviews);
router.get("/product/:productId", getProductReviews);
router.get("/:id", getReviewById);

// Authenticated user routes
router.post("/", createReview);
router.patch("/:id", updateReviewById);
router.delete("/:id", deleteReviewById);

module.exports = router;