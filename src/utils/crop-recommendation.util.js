// Crop Recommendation Utility
// This utility handles crop recommendation logic

class CropRecommendationUtil {
  // Calculate suitability score for a crop based on soil and climate
  static calculateSuitabilityScore(crop, soilData, climateData) {
    let score = 100;

    // Check pH suitability
    if (soilData.pH < crop.soilRequirements.pH.min || 
        soilData.pH > crop.soilRequirements.pH.max) {
      score -= 20;
    }

    // Check temperature suitability
    if (climateData.temperature < crop.climate.minTemperature ||
        climateData.temperature > crop.climate.maxTemperature) {
      score -= 15;
    }

    // Check rainfall suitability
    if (climateData.rainfall < crop.climate.minRainfall ||
        climateData.rainfall > crop.climate.maxRainfall) {
      score -= 15;
    }

    // Check soil type
    if (!crop.soilRequirements.soilType.includes(soilData.soilType)) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Predict yield based on various factors
  static predictYield(crop, farmSize, climateData, soilData) {
    let baseYield = 50; // base yield per acre

    // Adjust based on climate
    if (climateData.temperature >= crop.climate.minTemperature &&
        climateData.temperature <= crop.climate.maxTemperature) {
      baseYield *= 1.2; // 20% increase
    }

    // Adjust based on soil fertility
    if (soilData.organicMatter > 2.5) {
      baseYield *= 1.15; // 15% increase
    }

    return Math.round(baseYield * farmSize * 100) / 100;
  }

  // Calculate financial analysis
  static calculateFinancials(crop, farmSize, yield, marketPrice) {
    const seedCost = 5000 * farmSize; // per acre
    const laborCost = 3000 * farmSize;
    const fertilizerCost = 2000 * farmSize;
    const pesticideCost = 1000 * farmSize;
    const miscellaneousCost = 1000 * farmSize;

    const totalCost = 
      seedCost + laborCost + fertilizerCost + pesticideCost + miscellaneousCost;

    const totalProduction = yield * farmSize;
    const totalRevenue = totalProduction * marketPrice;

    const profit = totalRevenue - totalCost;
    const roi = (profit / totalCost) * 100;

    return {
      totalCost: Math.round(totalCost),
      totalRevenue: Math.round(totalRevenue),
      profit: Math.round(profit),
      roi: Math.round(roi),
      breakEvenPoint: (totalCost / marketPrice) / farmSize,
    };
  }

  // Analyze risk factors
  static analyzeRisk(cropName, location, climateData) {
    let weatherRisk = "low";
    let pestRisk = "medium";
    let marketRisk = "medium";

    // Weather risk assessment
    if (climateData.temperature > 40 || climateData.temperature < 5) {
      weatherRisk = "high";
    } else if (climateData.rainfall < 500 || climateData.rainfall > 3000) {
      weatherRisk = "high";
    }

    // Market risk (generally medium for most crops)
    if (cropName === "rice" || cropName === "wheat") {
      marketRisk = "low"; // stable market
    }

    // Pest risk based on season and crop
    if (location.includes("coastal")) {
      pestRisk = "high";
    }

    const overallRisk = [weatherRisk, pestRisk, marketRisk].includes("high")
      ? "high"
      : [weatherRisk, pestRisk, marketRisk].includes("medium")
      ? "medium"
      : "low";

    const mitigation = [];

    if (weatherRisk === "high") {
      mitigation.push("Install irrigation system");
      mitigation.push("Use weather-resistant varieties");
    }

    if (pestRisk === "high") {
      mitigation.push("Regular pest monitoring");
      mitigation.push("Use integrated pest management");
    }

    if (marketRisk === "high") {
      mitigation.push("Pre-arrange buyer contracts");
      mitigation.push("Improve storage facilities");
    }

    return {
      weatherRisk,
      pestRisk,
      marketRisk,
      overallRisk,
      mitigation,
    };
  }

  // Get market advisory
  static getMarketAdvisory(cropName, currentPrice, historicalData) {
    const averagePrice = 
      historicalData.reduce((sum, item) => sum + item.price, 0) / historicalData.length;

    let advice = "Hold";
    if (currentPrice > averagePrice * 1.2) {
      advice = "Sell now";
    } else if (currentPrice < averagePrice * 0.8) {
      advice = "Wait for better price";
    }

    return {
      currentPrice,
      priceGoal: averagePrice * 1.1,
      marketDemand: "stable",
      sellingChannels: ["Direct to wholesaler", "APMC market", "Online platform"],
      storageAdvice: "Store in cool, dry place",
      recommendation: advice,
    };
  }
}

module.exports = CropRecommendationUtil;
