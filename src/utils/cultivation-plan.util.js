// Cultivation Plan Utility
// This utility handles generation of cultivation schedules and plans

class CultivationPlanUtil {
  // Generate irrigation schedule
  static generateIrrigationSchedule(cropName, season, soilData, climateData) {
    const schedule = [];
    const daysBetweenIrrigation = this.calculateIrrigationInterval(
      soilData.moisture,
      climateData
    );

    // Growing period typically 90-150 days depending on crop
    const growingPeriod = 120;

    for (let i = 0; i < growingPeriod; i += daysBetweenIrrigation) {
      schedule.push({
        dayAfterSowing: i,
        waterQuantity: "50-60mm",
        timingTip: `Irrigate in early morning or evening`,
        soilMoistureBeforeIrrigation: "< 50%",
        soilMoistureAfterIrrigation: "70-80%",
      });
    }

    return {
      cropName,
      season,
      schedule,
      totalIrrigations: schedule.length,
      totalWaterRequired: `${schedule.length * 55}mm`,
    };
  }

  // Generate fertilizer schedule
  static generateFertilizerSchedule(cropName, farmSize) {
    return {
      cropName,
      farmSize,
      schedule: [
        {
          dayAfterSowing: 0,
          type: "Basal dose",
          fertilizers: [
            {
              name: "NPK (10:26:26)",
              quantity: `${500 * farmSize}kg`,
              method: "Mix in soil before planting",
            },
            {
              name: "FYM",
              quantity: `${5000 * farmSize}kg`,
              method: "Mix in soil 1 week before planting",
            },
          ],
        },
        {
          dayAfterSowing: 30,
          type: "First top dressing",
          fertilizers: [
            {
              name: "Urea",
              quantity: `${100 * farmSize}kg`,
              method: "Side dressing, followed by irrigation",
            },
          ],
        },
        {
          dayAfterSowing: 60,
          type: "Second top dressing",
          fertilizers: [
            {
              name: "Urea",
              quantity: `${80 * farmSize}kg`,
              method: "Side dressing, followed by irrigation",
            },
          ],
        },
        {
          dayAfterSowing: 90,
          type: "Potassium dose",
          fertilizers: [
            {
              name: "Potassium chloride",
              quantity: `${50 * farmSize}kg`,
              method: "Side dressing",
            },
          ],
        },
      ],
      notes: "Soil test recommended before fertilizer application",
    };
  }

  // Generate pest control schedule
  static generatePestControlSchedule(cropName, season) {
    return {
      cropName,
      season,
      schedule: [
        {
          dayAfterSowing: 15,
          pest: "Seedling pests",
          control: [
            "Field sanitation",
            "Remove infected plants",
            "Spray Imidacloprid 17.8% (1ml/liter)",
          ],
        },
        {
          dayAfterSowing: 30,
          pest: "Shoot fly and stem borer",
          control: [
            "Install pheromone traps",
            "Spray Chlorpyrifos 20% EC (1.5 ml/liter)",
            "Scout for egg masses and remove",
          ],
        },
        {
          dayAfterSowing: 45,
          pest: "Brown plant hopper",
          control: [
            "Release natural predators",
            "Spray Thiamethoxam 25% WG (0.5g/liter)",
            "Use sticky traps",
          ],
        },
        {
          dayAfterSowing: 60,
          pest: "Leaf folders and case worms",
          control: [
            "Remove affected leaves",
            "Spray Cyhalothrin 5% EC (1ml/liter)",
            "Encourage natural enemies",
          ],
        },
      ],
    };
  }

  // Calculate irrigation interval based on soil and climate
  static calculateIrrigationInterval(soilMoisture, climateData) {
    // Base interval for medium soil
    let interval = 7; // days

    // Adjust based on rainfall
    if (climateData.rainfall > 300) {
      interval += 5; // increase interval if more rain
    } else if (climateData.rainfall < 100) {
      interval -= 3; // decrease interval if less rain
    }

    // Adjust based on temperature
    if (climateData.temperature > 35) {
      interval -= 2; // more frequent in hot weather
    }

    // Adjust based on soil moisture retention
    if (soilMoisture < 40) {
      interval -= 2; // more frequent for sandy soils
    }

    return Math.max(3, Math.min(14, interval)); // minimum 3 days, maximum 14 days
  }

  // Generate comprehensive cultivation plan
  static generateComprehensivePlan(cropName, season, farmSize, soilData, climateData) {
    return {
      cropName,
      season,
      farmSize,
      plantingDate: new Date(),
      expectedHarvestDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      
      prepareFieldPhase: {
        duration: "2 weeks",
        activities: [
          "Field leveling",
          "Plowing and harrowing",
          "Adding compost/FYM",
          "Field preparation",
        ],
      },
      
      sowingPhase: {
        seedRate: "40-50 kg per hectare",
        methods: "Line sowing or broadcast",
        depth: "3-5cm",
        spacing: "Depends on crop variety",
      },
      
      irrigationSchedule: this.generateIrrigationSchedule(
        cropName,
        season,
        soilData,
        climateData
      ),
      
      fertilizerSchedule: this.generateFertilizerSchedule(cropName, farmSize),
      
      pestControlSchedule: this.generatePestControlSchedule(cropName, season),
      
      harvestingPhase: {
        harvestTime: "When 80% grain is mature",
        harvestMethod: "Manual or mechanical combine",
        expectedYield: "40-50 quintals per hectare",
        postHarvestTips: [
          "Clean the grain",
          "Dry to 13% moisture",
          "Store in cool, dry place",
        ],
      },
    };
  }
}

module.exports = CultivationPlanUtil;
