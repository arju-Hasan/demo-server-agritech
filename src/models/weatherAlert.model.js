const mongoose = require("mongoose");

const weatherAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // Location
  location: {
    division: String,
    district: String,
    upazila: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },

  // Weather data
  currentWeather: {
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
    pressure: Number,
    condition: String,
    feelsLike: Number,
    uvIndex: Number,
  },

  // Forecast
  forecast: [
    {
      date: Date,
      temperature: {
        min: Number,
        max: Number,
      },
      condition: String,
      rainfall: Number,
      humidity: Number,
      windSpeed: Number,
    },
  ],

  // Alerts
  alerts: [
    {
      alertType: {
        type: String,
        enum: ["extreme_heat", "heavy_rain", "frost", "hail", "storm", "drought"],
      },
      severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
      },
      message: String,
      recommendedAction: String,
      issuedAt: Date,
      validUntil: Date,
    },
  ],

  // Recommendations for farming
  farmingRecommendations: [String],

  // Metadata
  lastUpdated: {
    type: Date,
    default: Date.now,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WeatherAlert", weatherAlertSchema);
