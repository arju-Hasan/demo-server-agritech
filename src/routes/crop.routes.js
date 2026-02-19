const express = require("express");
const router = express.Router();

const {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} = require("../controllers/crop.controller");

router.post("/", createCrop);
router.get("/", getAllCrops);
router.get("/:id", getCropById);
router.patch("/:id", updateCrop);
router.delete("/:id", deleteCrop);

module.exports = router;
