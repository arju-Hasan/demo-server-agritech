const express = require("express");
const router = express.Router();

const {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherAlerts,
  createOrUpdateWeatherAlert,
  getAllWeatherAlerts,
  getWeatherAlertById,
  deleteWeatherAlert,
} = require("../controllers/weather.controller");

router.post("/", createOrUpdateWeatherAlert);
router.get("/", getAllWeatherAlerts);
router.get("/current", getCurrentWeather);
router.get("/forecast", getWeatherForecast);
router.get("/alerts", getWeatherAlerts);
router.get("/:id", getWeatherAlertById);
router.delete("/:id", deleteWeatherAlert);

module.exports = router;
