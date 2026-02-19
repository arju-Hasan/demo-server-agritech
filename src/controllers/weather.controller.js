const WeatherAlert = require("../models/weatherAlert.model");

// Get Current Weather
exports.getCurrentWeather = async (req, res) => {
  try {
    const { lat, lng, division, district, upazila } = req.query;

    let filter = {};

    if (lat && lng) {
      // Find alerts near coordinates
      filter = {
        "location.coordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: 10000, // 10km
          },
        },
      };
    } else if (division && district && upazila) {
      filter = {
        "location.division": division,
        "location.district": district,
        "location.upazila": upazila,
      };
    }

    const weather = await WeatherAlert.findOne({
      ...filter,
      isActive: true,
    }).sort({ lastUpdated: -1 });

    if (!weather) {
      return res.status(404).json({
        success: false,
        message: "Weather data not found for the location",
      });
    }

    res.status(200).json({
      success: true,
      data: weather,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Weather Forecast
exports.getWeatherForecast = async (req, res) => {
  try {
    const { division, district, upazila } = req.query;

    const weather = await WeatherAlert.findOne({
      "location.division": division,
      "location.district": district,
      "location.upazila": upazila,
      isActive: true,
    });

    if (!weather) {
      return res.status(404).json({
        success: false,
        message: "Weather forecast not found",
      });
    }

    res.status(200).json({
      success: true,
      data: weather.forecast,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Weather Alerts
exports.getWeatherAlerts = async (req, res) => {
  try {
    const { division, district, upazila, severity } = req.query;

    const filter = {
      "location.division": division,
      "location.district": district,
      "location.upazila": upazila,
      isActive: true,
    };

    const weather = await WeatherAlert.findOne(filter);

    if (!weather) {
      return res.status(404).json({
        success: false,
        message: "Weather alerts not found",
      });
    }

    const alerts = severity
      ? weather.alerts.filter((alert) => alert.severity === severity)
      : weather.alerts;

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create or Update Weather Alert
exports.createOrUpdateWeatherAlert = async (req, res) => {
  try {
    const { location, currentWeather, forecast, alerts, farmingRecommendations } = req.body;

    let weather = await WeatherAlert.findOne({
      "location.division": location.division,
      "location.district": location.district,
      "location.upazila": location.upazila,
    });

    if (weather) {
      // Update existing
      weather = await WeatherAlert.findByIdAndUpdate(
        weather._id,
        {
          location,
          currentWeather,
          forecast,
          alerts,
          farmingRecommendations,
          lastUpdated: new Date(),
          updatedAt: new Date(),
        },
        { new: true }
      );
    } else {
      // Create new
      weather = await WeatherAlert.create({
        location,
        currentWeather,
        forecast,
        alerts,
        farmingRecommendations,
      });
    }

    res.status(201).json({
      success: true,
      message: "Weather alert created/updated successfully",
      data: weather,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Weather Alerts
exports.getAllWeatherAlerts = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === "true";

    const alerts = await WeatherAlert.find(filter).sort({ lastUpdated: -1 });

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Weather Alert by ID
exports.getWeatherAlertById = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await WeatherAlert.findById(id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Weather alert not found",
      });
    }

    res.status(200).json({
      success: true,
      data: alert,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Weather Alert
exports.deleteWeatherAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await WeatherAlert.findByIdAndDelete(id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Weather alert not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Weather alert deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
