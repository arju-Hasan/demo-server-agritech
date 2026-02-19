// Weather Alert Validation Schema

const validateCreateWeatherAlert = (req, res, next) => {
  const { location, currentWeather } = req.body;

  if (!location) {
    return res.status(400).json({ success: false, message: "Location is required" });
  }

  if (!location.division || !location.district || !location.upazila) {
    return res.status(400).json({ success: false, message: "Complete location details are required" });
  }

  if (!currentWeather) {
    return res.status(400).json({ success: false, message: "Current weather data is required" });
  }

  if (currentWeather.temperature === undefined) {
    return res.status(400).json({ success: false, message: "Temperature is required" });
  }

  if (currentWeather.humidity === undefined) {
    return res.status(400).json({ success: false, message: "Humidity is required" });
  }

  if (currentWeather.humidity < 0 || currentWeather.humidity > 100) {
    return res.status(400).json({ success: false, message: "Humidity must be between 0 and 100" });
  }

  next();
};

const validateWeatherAlertsQuery = (req, res, next) => {
  const { severity } = req.query;

  if (severity) {
    const validSeverities = ["low", "medium", "high", "critical"];
    if (!validSeverities.includes(severity)) {
      return res.status(400).json({ success: false, message: "Invalid severity level" });
    }
  }

  next();
};

module.exports = {
  validateCreateWeatherAlert,
  validateWeatherAlertsQuery,
};
