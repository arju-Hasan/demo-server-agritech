const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Import models
const User = require("../models/user.model");
const Crop = require("../models/crop.model");
const SoilAnalysis = require("../models/soil.model");
const CropMonitoring = require("../models/cropMonitoring.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Review = require("../models/review.model");
const Transaction = require("../models/transaction.model");
const Notification = require("../models/notification.model");
const Message = require("../models/message.model");
const CropRecommendation = require("../models/cropRecommendation.model");
const DiseaseDetection = require("../models/diseaseDetection.model");
const WeatherAlert = require("../models/weatherAlert.model");
const BlogPost = require("../models/blogPost.model");
const ForumPost = require("../models/forumPost.model");
const ForumComment = require("../models/forumComment.model");
const SystemLog = require("../models/systemLog.model");

// Sample data for each collection
const seedData = {
  // Users Collection
  users: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      email: "farmer@example.com",
      username: "farmer123",
      password: "$2a$10$hashed_password_here",
      role: "farmer",
      status: "active",
      profile: {
        firstName: "আব্দুল",
        lastName: "করিম",
        phone: "01712345678",
        address: {
          division: "Dhaka",
          district: "Gazipur",
          upazila: "Kaliakoir",
          village: "Konabari",
          coordinates: {
            lat: 24.0833,
            lng: 90.2167,
          },
        },
        avatar: "https://cdn.example.com/avatar1.jpg",
        nid: "1234567890123",
      },
      farmerData: {
        farmSize: 5,
        farmingExperience: 10,
        crops: ["rice", "wheat", "potato"],
        totalLand: 5,
      },
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      emailVerified: true,
      lastLogin: new Date("2026-02-18T08:30:00Z"),
      loginAttempts: 0,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      email: "seller@example.com",
      username: "seller456",
      password: "$2a$10$hashed_password_here",
      role: "seller",
      status: "active",
      profile: {
        firstName: "রহিম",
        lastName: "আহমেদ",
        phone: "01812345678",
        address: {
          division: "Chattogram",
          district: "Chittagong",
          upazila: "Hathazari",
          village: "Barisal",
          coordinates: {
            lat: 22.3013,
            lng: 91.8138,
          },
        },
        avatar: "https://cdn.example.com/avatar2.jpg",
      },
      sellerData: {
        businessName: "Green Seeds Bangladesh",
        businessType: "seeds",
        tradeLicense: "TB-2026-001234",
        verified: true,
        rating: 4.8,
        totalSales: 1250,
      },
      emailVerified: true,
      lastLogin: new Date("2026-02-17T14:20:00Z"),
      loginAttempts: 0,
    },
  ],

  // Crops Collection
  crops: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
      name: "Rice",
      bannedName: "ধান",
      description: "Staple cereal crop grown in tropical regions",
      cropCategory: "cereal",
      season: "kharif",
      climate: {
        minTemperature: 20,
        maxTemperature: 35,
        minRainfall: 1200,
        maxRainfall: 2250,
        humidity: "70-80%",
      },
      soilRequirements: {
        soilType: ["loamy", "clay"],
        pH: {
          min: 5.0,
          max: 7.0,
        },
        fertility: "High",
      },
      growthStages: [
        {
          name: "Germination",
          daysFromSowing: 5,
          description: "Seed germination and sprouting",
        },
        {
          name: "Vegetative",
          daysFromSowing: 30,
          description: "Leaf growth and tiller formation",
        },
        {
          name: "Flowering",
          daysFromSowing: 75,
          description: "Panicle emergence and flowering",
        },
      ],
      harvestingInfo: {
        harvestTime: "November - December",
        harvestStage: "Mature grain stage",
        yield: "5-7 tons/acre",
      },
      commonPests: ["Brown plant hopper", "Stem borer", "Rice leaf folder"],
      commonDiseases: ["Blast", "Sheath blight", "Brown spot"],
      marketPrice: {
        minPrice: 1400,
        maxPrice: 1600,
        lastUpdated: new Date("2026-02-18T10:00:00Z"),
      },
      image: "https://cdn.example.com/crops/rice.jpg",
      isActive: true,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439014"),
      name: "Tomato",
      bannedName: "টমেটো",
      description: "Popular vegetable crop rich in vitamins",
      cropCategory: "vegetable",
      season: "rabi",
      climate: {
        minTemperature: 15,
        maxTemperature: 32,
        minRainfall: 500,
        maxRainfall: 1000,
        humidity: "70-75%",
      },
      soilRequirements: {
        soilType: ["loamy", "sandy loam"],
        pH: {
          min: 6.0,
          max: 7.5,
        },
        fertility: "High",
      },
      growthStages: [
        {
          name: "Seedling",
          daysFromSowing: 7,
          description: "Seed germination and seedling emergence",
        },
        {
          name: "Vegetative",
          daysFromSowing: 30,
          description: "Plant growth and branch formation",
        },
        {
          name: "Fruiting",
          daysFromSowing: 50,
          description: "Flowering and fruit development",
        },
      ],
      harvestingInfo: {
        harvestTime: "May - August",
        harvestStage: "Fruit ripening stage",
        yield: "40-50 tons/acre",
      },
      commonPests: ["Fruit borer", "Whitefly", "Thrips"],
      commonDiseases: ["Late blight", "Early blight", "Fusarium wilt"],
      marketPrice: {
        minPrice: 25,
        maxPrice: 50,
        lastUpdated: new Date("2026-02-18T10:00:00Z"),
      },
      image: "https://cdn.example.com/crops/tomato.jpg",
      isActive: true,
    },
  ],

  // Soil Analysis Collection
  soilanalyses: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439015"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      soilData: {
        pH: 6.5,
        moisture: 65,
        nitrogen: 250,
        phosphorus: 20,
        potassium: 180,
        organicMatter: 2.5,
        electricalConductivity: 0.75,
        soilType: "loamy",
      },
      location: {
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kaliakoir",
        village: "Konabari",
        coordinates: {
          lat: 24.0833,
          lng: 90.2167,
        },
      },
      recommendations: {
        fertilizers: [
          {
            name: "NPK (10:26:26)",
            quantity: "500 kg",
            timing: "Before planting",
          },
          {
            name: "DAP",
            quantity: "100 kg",
            timing: "At sowing",
          },
        ],
        amendments: ["Organic compost", "Farm yard manure"],
        crops: ["Rice", "Wheat", "Potato"],
      },
      analysisDate: new Date("2026-02-10T09:00:00Z"),
      laboratory: "Central Soil Testing Laboratory",
      notes: "Soil is suitable for rice cultivation. Good nitrogen level but phosphorus needs supplementation.",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439016"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      soilData: {
        pH: 7.2,
        moisture: 55,
        nitrogen: 180,
        phosphorus: 35,
        potassium: 220,
        organicMatter: 3.2,
        electricalConductivity: 0.65,
        soilType: "sandy loam",
      },
      location: {
        division: "Chattogram",
        district: "Chittagong",
        upazila: "Hathazari",
        village: "Barisal",
        coordinates: {
          lat: 22.3013,
          lng: 91.8138,
        },
      },
      recommendations: {
        fertilizers: [
          {
            name: "Urea",
            quantity: "150 kg",
            timing: "Spilt application",
          },
          {
            name: "TSP",
            quantity: "75 kg",
            timing: "At planting",
          },
        ],
        amendments: ["Lime", "Mulching"],
        crops: ["Tomato", "Papaya", "Coconut"],
      },
      analysisDate: new Date("2026-02-08T10:30:00Z"),
      laboratory: "Regional Soil Test Center",
      notes: "Good fertility level. Slightly alkaline pH. Suitable for vegetable crops.",
    },
  ],

  // Crop Monitoring Collection
  cropmonitorings: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439017"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      cropId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
      cropName: "Rice",
      farmSize: 5,
      plantingDate: new Date("2026-01-20T06:00:00Z"),
      location: {
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kaliakoir",
        field: "Main Field",
      },
      growthStage: "Vegetative",
      healthStatus: "excellent",
      activities: [
        {
          date: new Date("2026-02-10T08:00:00Z"),
          type: "irrigation",
          description: "First irrigation",
          details: "Applied 5 inch water",
        },
        {
          date: new Date("2026-02-15T07:30:00Z"),
          type: "fertilizer",
          description: "Nutrient application",
          details: "Applied NPK fertilizer",
        },
      ],
      expenses: [
        {
          date: new Date("2026-01-20T06:00:00Z"),
          category: "seeds",
          amount: 5000,
          description: "Rice seed purchase",
          itemsBought: "50 kg certified seed",
        },
        {
          date: new Date("2026-02-10T08:00:00Z"),
          category: "fertilizers",
          amount: 3000,
          description: "NPK fertilizer",
          itemsBought: "100 kg NPK",
        },
      ],
      harvestRecord: {
        expectedHarvestDate: new Date("2026-04-20T06:00:00Z"),
      },
      monitoringRecords: [
        {
          date: new Date("2026-02-15T10:00:00Z"),
          moisture: 65,
          temperature: 28,
          plantHeight: "25 cm",
          leafColor: "Green",
          pestObserved: [],
          diseaseObserved: [],
          notes: "Plant growth is satisfactory",
        },
      ],
      status: "growing",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439018"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      cropId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439014"),
      cropName: "Tomato",
      farmSize: 2,
      plantingDate: new Date("2025-11-15T06:00:00Z"),
      location: {
        division: "Chattogram",
        district: "Chittagong",
        upazila: "Hathazari",
        field: "Vegetable Patch",
      },
      growthStage: "Fruiting",
      healthStatus: "good",
      activities: [
        {
          date: new Date("2025-12-10T08:00:00Z"),
          type: "staking",
          description: "Plant support installation",
          details: "Added bamboo stakes",
        },
      ],
      expenses: [
        {
          date: new Date("2025-11-15T06:00:00Z"),
          category: "seeds",
          amount: 8000,
          description: "Tomato seedlings",
          itemsBought: "400 seedlings",
        },
      ],
      harvestRecord: {
        expectedHarvestDate: new Date("2026-02-28T06:00:00Z"),
        totalYield: 4000,
        yieldUnit: "kg",
        quality: "grade-a",
        notes: "Good quality produce",
      },
      monitoringRecords: [
        {
          date: new Date("2026-02-15T10:00:00Z"),
          moisture: 55,
          temperature: 32,
          plantHeight: "60 cm",
          leafColor: "Green",
          pestObserved: [],
          diseaseObserved: [],
          notes: "Flowering and fruiting observed",
        },
      ],
      status: "harvesting",
    },
  ],

  // Products Collection
  products: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439019"),
      name: "Certified Rice Seeds",
      description: "High-yield certified rice seeds suitable for Kharif season",
      category: "seeds",
      price: 450,
      stock: 150,
      sellerId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      image: "https://cdn.example.com/products/rice-seeds.jpg",
      images: [
        "https://cdn.example.com/products/rice-seeds-1.jpg",
        "https://cdn.example.com/products/rice-seeds-2.jpg",
      ],
      rating: 4.7,
      totalReviews: 45,
      sku: "RS-2026-001",
      brand: "Green Seeds Bangladesh",
      specifications: {
        variety: "BR-29",
        purity: "99.5%",
        germination: "95%",
        weight: "25 kg",
      },
      minimumStock: 50,
      costPrice: 350,
      discount: 5,
      isActive: true,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439020"),
      name: "Organic NPK Fertilizer",
      description: "Balanced organic NPK fertilizer for sustainable agriculture",
      category: "fertilizers",
      price: 1200,
      stock: 80,
      sellerId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      image: "https://cdn.example.com/products/npk-fertilizer.jpg",
      images: [
        "https://cdn.example.com/products/npk-1.jpg",
        "https://cdn.example.com/products/npk-2.jpg",
        "https://cdn.example.com/products/npk-3.jpg",
      ],
      rating: 4.5,
      totalReviews: 28,
      sku: "NPK-2026-050",
      brand: "EcoFarm Agro",
      specifications: {
        ratio: "10-26-26",
        packaging: "50 kg bag",
        certifications: "Organic Certified",
      },
      minimumStock: 20,
      costPrice: 900,
      discount: 10,
      isActive: true,
    },
  ],

  // Orders Collection
  orders: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439021"),
      orderId: "ORD-2026-001001",
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      sellerId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      items: [
        {
          productId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439019"),
          productName: "Certified Rice Seeds",
          quantity: 2,
          price: 450,
          subtotal: 900,
        },
      ],
      shippingAddress: {
        fullName: "আব্দুল করিম",
        phone: "01712345678",
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kaliakoir",
        village: "Konabari",
        address: "House 123, Main Road",
        zipCode: "1700",
      },
      subtotal: 900,
      shippingCost: 100,
      discount: 50,
      tax: 135,
      total: 1085,
      paymentMethod: "mobile_banking",
      paymentStatus: "completed",
      status: "shipped",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date("2026-02-15T10:30:00Z"),
        },
        {
          status: "confirmed",
          timestamp: new Date("2026-02-15T11:00:00Z"),
        },
        {
          status: "processing",
          timestamp: new Date("2026-02-16T08:00:00Z"),
        },
        {
          status: "shipped",
          timestamp: new Date("2026-02-17T14:00:00Z"),
        },
      ],
      trackingNumber: "BD-2026-001001",
      estimatedDelivery: new Date("2026-02-20T06:00:00Z"),
      notes: "Deliver to main gate",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439022"),
      orderId: "ORD-2026-001002",
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      sellerId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      items: [
        {
          productId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439020"),
          productName: "Organic NPK Fertilizer",
          quantity: 1,
          price: 1200,
          subtotal: 1200,
        },
        {
          productId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439019"),
          productName: "Certified Rice Seeds",
          quantity: 1,
          price: 450,
          subtotal: 450,
        },
      ],
      shippingAddress: {
        fullName: "আব্দুল করিম",
        phone: "01712345678",
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kaliakoir",
        village: "Konabari",
        address: "House 123, Main Road",
        zipCode: "1700",
      },
      subtotal: 1650,
      shippingCost: 150,
      discount: 100,
      tax: 240,
      total: 1940,
      paymentMethod: "card",
      paymentStatus: "completed",
      status: "delivered",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date("2026-02-10T09:00:00Z"),
        },
        {
          status: "confirmed",
          timestamp: new Date("2026-02-10T10:00:00Z"),
        },
        {
          status: "delivered",
          timestamp: new Date("2026-02-13T15:30:00Z"),
        },
      ],
      trackingNumber: "BD-2026-001002",
      actualDelivery: new Date("2026-02-13T15:30:00Z"),
      notes: "Urgent delivery required",
    },
  ],

  // Reviews Collection
  reviews: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439023"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      productId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439019"),
      orderId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439021"),
      rating: 5,
      title: "Excellent quality seeds",
      comment:
        "The seeds germinated well and the plants grew healthy. Highly recommended product.",
      images: [
        "https://cdn.example.com/reviews/seed-review-1.jpg",
        "https://cdn.example.com/reviews/seed-review-2.jpg",
      ],
      isApproved: true,
      helpful: 12,
      notHelpful: 1,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439024"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      productId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439020"),
      orderId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439022"),
      rating: 4,
      title: "Good fertilizer with quick results",
      comment:
        "The fertilizer gives good results. Plant growth improved significantly after application.",
      images: [],
      isApproved: true,
      helpful: 8,
      notHelpful: 0,
    },
  ],

  // Transactions Collection
  transactions: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439025"),
      transactionId: "TXN-2026-001001",
      orderId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439021"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      type: "purchase",
      category: "product_sale",
      amount: 1085,
      paymentMethod: "mobile_banking",
      status: "completed",
      gatewayResponse: {
        transactionCode: "bkash-12345678",
        referenceNumber: "REF-2026-001001",
        description: "Payment for Order ORD-2026-001001",
      },
      incomeExpense: "income",
      description: "Sale of Certified Rice Seeds",
      notes: "Successful payment received",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439026"),
      transactionId: "TXN-2026-001002",
      orderId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439022"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      type: "purchase",
      category: "product_sale",
      amount: 1940,
      paymentMethod: "card",
      status: "completed",
      gatewayResponse: {
        transactionCode: "visa-87654321",
        referenceNumber: "REF-2026-001002",
        description: "Payment for Order ORD-2026-001002",
      },
      incomeExpense: "income",
      description: "Sale of Organic NPK Fertilizer and Rice Seeds",
      notes: "Card payment processed successfully",
    },
  ],

  // Notifications Collection
  notifications: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439027"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      type: "order_shipped",
      title: "Your order has been shipped",
      message:
        "Order ORD-2026-001001 has been shipped and is on its way to you.",
      relatedId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439021"),
      relatedModel: "Order",
      isRead: false,
      actionUrl: "/orders/ORD-2026-001001",
      priority: "high",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439028"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      type: "product_review",
      title: "Review request for Certified Rice Seeds",
      message: "Please share your feedback on the Certified Rice Seeds you purchased.",
      relatedId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439019"),
      relatedModel: "Product",
      isRead: true,
      readAt: new Date("2026-02-18T08:30:00Z"),
      actionUrl: "/products/507f1f77bcf86cd799439019/review",
      priority: "medium",
    },
  ],

  // Conversations Collection
  conversations: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439029"),
      participants: [
        new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      ],
      lastMessage: "When will the next batch of rice seeds be available?",
      lastMessageTime: new Date("2026-02-18T10:15:00Z"),
      unreadCount: [
        {
          userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
          count: 2,
        },
        {
          userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
          count: 0,
        },
      ],
    },
  ],

  // Messages Collection
  messages: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439030"),
      conversationId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439029"),
      senderId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      receiverId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      message: "Hi, I'm interested in buying rice seeds in bulk. What are your rates?",
      attachments: [],
      isRead: true,
      readAt: new Date("2026-02-10T09:30:00Z"),
    },
  ],

  // Blog Posts Collection
  blogposts: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439037"),
      title: "10 Tips for Successful Rice Farming",
      slug: "10-tips-for-successful-rice-farming",
      content:
        "Rice farming requires proper planning and management. Here are 10 essential tips for successful rice cultivation...",
      excerpt: "Learn the 10 most important tips for successful rice farming to maximize your yield.",
      authorId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      category: "farming-tips",
      tags: ["rice", "farming", "tips", "yield"],
      image: "https://cdn.example.com/blog/rice-farming.jpg",
      likes: 45,
      likedBy: [
        new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        new mongoose.Types.ObjectId("507f1f77bcf86cd799439021"),
      ],
      views: 1250,
      isPublished: true,
      publishedAt: new Date("2026-02-01T10:00:00Z"),
      metaTitle: "10 Tips for Successful Rice Farming - Smart Farming",
      metaDescription:
        "Learn proven tips for successful rice farming and increase your yield significantly.",
      metaKeywords: "rice farming, tips, yield, agriculture",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439038"),
      title: "Organic Pest Management for Vegetable Crops",
      slug: "organic-pest-management-vegetable-crops",
      content:
        "Organic methods are gaining popularity for pest management in vegetable crops. This article explores various organic approaches...",
      excerpt:
        "Discover effective organic pest management techniques for your vegetable crops without harmful chemicals.",
      authorId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      category: "pest-management",
      tags: ["organic", "pest", "vegetables", "management"],
      image: "https://cdn.example.com/blog/organic-pest.jpg",
      likes: 32,
      likedBy: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      views: 856,
      isPublished: true,
      publishedAt: new Date("2026-02-10T12:00:00Z"),
      metaTitle: "Organic Pest Management for Vegetables",
      metaDescription: "Learn organic pest management strategies for vegetable crops.",
      metaKeywords: "organic, pest management, vegetables, sustainable",
    },
  ],

  // Forum Posts Collection
  forumposts: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439039"),
      title: "Best fertilizer for wheat cultivation",
      description:
        "I'm planning to cultivate wheat on my 3-acre farm. What would be the best fertilizer to use for maximum yield?",
      authorId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      category: "soil-fertilizer",
      status: "solved",
      isSolved: true,
      solvedBy: new mongoose.Types.ObjectId("507f1f77bcf86cd799439030"),
      views: 234,
      likes: 8,
      likedBy: [
        new mongoose.Types.ObjectId("507f1f77bcf86cd799439021"),
        new mongoose.Types.ObjectId("507f1f77bcf86cd799439022"),
      ],
      commentCount: 5,
      isPinned: true,
      priority: "high",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439040"),
      title: "How to identify early blight in tomato plants",
      description:
        "My tomato plants are showing some symptoms that I think might be early blight. How can I identify it for sure and what's the treatment?",
      authorId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      category: "pest-disease",
      status: "open",
      isSolved: false,
      views: 156,
      likes: 5,
      likedBy: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      commentCount: 3,
      isPinned: false,
      priority: "medium",
    },
  ],

  // Forum Comments Collection
  forumcomments: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439041"),
      postId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439039"),
      authorId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439030"),
      content:
        "For wheat cultivation, I recommend using a balanced NPK fertilizer at the rate of 120:60:40 kg/acre. Apply half of nitrogen at sowing and remaining in two splits. DAP at sowing, urea at tillering and ear emergence stage.",
      parentCommentId: null,
      replies: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439042")],
      likes: 12,
      likedBy: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      isMarkedAsAnswer: true,
      isModerated: false,
      isHidden: false,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439042"),
      postId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439039"),
      authorId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      content:
        "Thank you for the detailed recommendation. This is very helpful. I'll follow this schedule for my wheat farm.",
      parentCommentId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439041"),
      replies: [],
      likes: 3,
      likedBy: [],
      isMarkedAsAnswer: false,
      isModerated: false,
      isHidden: false,
    },
  ],

  // System Logs Collection
  systemlogs: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439043"),
      type: "error",
      category: "Product Management",
      message: "Failed to update product stock",
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      url: "/api/v1/products/507f1f77bcf86cd799439019/stock",
      method: "PUT",
      errorDetails: {
        stack:
          "Error: Database connection failed\n at updateStock (db.js:45:12)",
        code: "DB_CONNECTION_ERROR",
      },
      statusCode: 500,
      metadata: {
        productId: "507f1f77bcf86cd799439019",
        attemptedStock: 100,
      },
      severity: "high",
      timestamp: new Date("2026-02-18T14:30:00Z"),
      isResolved: false,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439044"),
      type: "user_action",
      category: "Authentication",
      message: "User login successful",
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      ipAddress: "192.168.1.105",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)",
      url: "/api/v1/auth/login",
      method: "POST",
      statusCode: 200,
      metadata: {
        email: "farmer@example.com",
        role: "farmer",
        loginTime: new Date("2026-02-18T08:30:00Z"),
      },
      severity: "low",
      timestamp: new Date("2026-02-18T08:30:00Z"),
      isResolved: true,
    },
  ],

  // Crop Recommendation Collection
  croprecommendations: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439031"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      inputData: {
        soilAnalysisId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439015"),
        farmSize: 5,
        season: "kharif",
        budget: 50000,
        location: {
          division: "Dhaka",
          district: "Gazipur",
          upazila: "Kaliakoir",
        },
      },
      recommendedCrops: [
        {
          cropId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
          cropName: "Rice",
          suitabilityScore: 95,
          expectedYield: "5-7 tons/acre",
          harvestTime: "November - December",
          estimatedCost: 45000,
          estimatedProfit: 85000,
          riskLevel: "low",
        },
      ],
      financialAnalysis: {
        totalInvestment: 45000,
        expectedRevenue: 140000,
        expectedProfit: 95000,
        roi: 211,
        breakEvenPoint: 2500,
      },
      status: "selected",
      selectedCrop: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439032"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      inputData: {
        soilAnalysisId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439016"),
        farmSize: 2,
        season: "rabi",
        budget: 30000,
        location: {
          division: "Chattogram",
          district: "Chittagong",
          upazila: "Hathazari",
        },
      },
      recommendedCrops: [
        {
          cropId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439014"),
          cropName: "Tomato",
          suitabilityScore: 92,
          expectedYield: "40-50 tons/acre",
          harvestTime: "May - August",
          estimatedCost: 28000,
          estimatedProfit: 72000,
          riskLevel: "medium",
        },
      ],
      financialAnalysis: {
        totalInvestment: 28000,
        expectedRevenue: 100000,
        expectedProfit: 72000,
        roi: 257,
        breakEvenPoint: 1200,
      },
      status: "completed",
      selectedCrop: new mongoose.Types.ObjectId("507f1f77bcf86cd799439014"),
    },
  ],

  // Disease Detection Collection
  diseasedetections: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439033"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      cropMonitoringId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439017"),
      cropName: "Rice",
      location: {
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kaliakoir",
      },
      imageUrl: "https://cdn.example.com/disease-detection/rice-blast-1.jpg",
      uploadDate: new Date("2026-02-16T10:30:00Z"),
      detectionResults: {
        diseaseName: "Rice Blast",
        confidence: 94,
        severity: "moderate",
        affectedArea: "25% of the field",
      },
      status: "under_treatment",
      treatmentStartDate: new Date("2026-02-16T11:00:00Z"),
      notes: "Disease detected early, chances of recovery are high",
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439034"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      cropMonitoringId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439018"),
      cropName: "Tomato",
      location: {
        division: "Chattogram",
        district: "Chittagong",
        upazila: "Hathazari",
      },
      imageUrl: "https://cdn.example.com/disease-detection/tomato-blight-1.jpg",
      uploadDate: new Date("2026-02-12T09:15:00Z"),
      detectionResults: {
        diseaseName: "Early Blight",
        confidence: 89,
        severity: "mild",
        affectedArea: "10% of plants",
      },
      status: "resolved",
      treatmentStartDate: new Date("2026-02-12T10:00:00Z"),
      treatmentCompletionDate: new Date("2026-02-15T16:00:00Z"),
      notes: "Disease controlled successfully with timely intervention",
    },
  ],

  // Weather Alert Collection
  weatheralerts: [
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439035"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      location: {
        division: "Dhaka",
        district: "Gazipur",
        upazila: "Kaliakoir",
        coordinates: {
          lat: 24.0833,
          lng: 90.2167,
        },
      },
      currentWeather: {
        temperature: 28.5,
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        condition: "Partly Cloudy",
        feelsLike: 30,
        uvIndex: 6,
      },
      alerts: [
        {
          alertType: "heavy_rain",
          severity: "medium",
          message: "Heavy rainfall expected in the next 2-3 days",
          recommendedAction:
            "Prepare drainage systems and avoid pesticide spraying",
          issuedAt: new Date("2026-02-18T10:00:00Z"),
          validUntil: new Date("2026-02-20T18:00:00Z"),
        },
      ],
      lastUpdated: new Date("2026-02-18T12:00:00Z"),
      isActive: true,
    },
    {
      _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439036"),
      userId: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      location: {
        division: "Chattogram",
        district: "Chittagong",
        upazila: "Hathazari",
        coordinates: {
          lat: 22.3013,
          lng: 91.8138,
        },
      },
      currentWeather: {
        temperature: 30.2,
        humidity: 70,
        windSpeed: 15,
        pressure: 1011,
        condition: "Cloudy",
        feelsLike: 32,
        uvIndex: 7,
      },
      alerts: [
        {
          alertType: "extreme_heat",
          severity: "high",
          message: "Heat wave expected with temperatures up to 36°C",
          recommendedAction: "Increase irrigation frequency, use mulching to retain moisture",
          issuedAt: new Date("2026-02-18T08:00:00Z"),
          validUntil: new Date("2026-02-21T18:00:00Z"),
        },
      ],
      lastUpdated: new Date("2026-02-18T12:00:00Z"),
      isActive: true,
    },
  ],
};

// Clear function - clear all collections
async function clearCollections() {
  try {
    console.log("Clearing collections...");
    await User.deleteMany({});
    await Crop.deleteMany({});
    await SoilAnalysis.deleteMany({});
    await CropMonitoring.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Transaction.deleteMany({});
    await Notification.deleteMany({});
    await Message.deleteMany({});
    await CropRecommendation.deleteMany({});
    await DiseaseDetection.deleteMany({});
    await WeatherAlert.deleteMany({});
    await BlogPost.deleteMany({});
    await ForumPost.deleteMany({});
    await ForumComment.deleteMany({});
    await SystemLog.deleteMany({});
    console.log("✅ All collections cleared");
  } catch (error) {
    console.error("❌ Error clearing collections:", error.message);
    throw error;
  }
}

// Seed function
async function seedDatabase() {
  try {
    // Connect to database
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await clearCollections();

    // Seed each collection
    console.log("\n📥 Seeding collections...\n");

    await User.insertMany(seedData.users);
    console.log(`✅ Users: ${seedData.users.length} documents inserted`);

    await Crop.insertMany(seedData.crops);
    console.log(`✅ Crops: ${seedData.crops.length} documents inserted`);

    await SoilAnalysis.insertMany(seedData.soilanalyses);
    console.log(`✅ Soil Analysis: ${seedData.soilanalyses.length} documents inserted`);

    await CropMonitoring.insertMany(seedData.cropmonitorings);
    console.log(`✅ Crop Monitoring: ${seedData.cropmonitorings.length} documents inserted`);

    await Product.insertMany(seedData.products);
    console.log(`✅ Products: ${seedData.products.length} documents inserted`);

    await Order.insertMany(seedData.orders);
    console.log(`✅ Orders: ${seedData.orders.length} documents inserted`);

    await Review.insertMany(seedData.reviews);
    console.log(`✅ Reviews: ${seedData.reviews.length} documents inserted`);

    await Transaction.insertMany(seedData.transactions);
    console.log(`✅ Transactions: ${seedData.transactions.length} documents inserted`);

    await Notification.insertMany(seedData.notifications);
    console.log(`✅ Notifications: ${seedData.notifications.length} documents inserted`);

    await Message.insertMany(seedData.conversations || []);
    console.log(`✅ Conversations: ${(seedData.conversations || []).length} documents inserted`);

    await Message.insertMany(seedData.messages || []);
    console.log(`✅ Messages: ${(seedData.messages || []).length} documents inserted`);

    await CropRecommendation.insertMany(seedData.croprecommendations);
    console.log(`✅ Crop Recommendations: ${seedData.croprecommendations.length} documents inserted`);

    await DiseaseDetection.insertMany(seedData.diseasedetections);
    console.log(`✅ Disease Detections: ${seedData.diseasedetections.length} documents inserted`);

    await WeatherAlert.insertMany(seedData.weatheralerts);
    console.log(`✅ Weather Alerts: ${seedData.weatheralerts.length} documents inserted`);

    await BlogPost.insertMany(seedData.blogposts);
    console.log(`✅ Blog Posts: ${seedData.blogposts.length} documents inserted`);

    await ForumPost.insertMany(seedData.forumposts);
    console.log(`✅ Forum Posts: ${seedData.forumposts.length} documents inserted`);

    await ForumComment.insertMany(seedData.forumcomments);
    console.log(`✅ Forum Comments: ${seedData.forumcomments.length} documents inserted`);

    await SystemLog.insertMany(seedData.systemlogs);
    console.log(`✅ System Logs: ${seedData.systemlogs.length} documents inserted`);

    console.log("\n" + "=".repeat(50));
    console.log("✅ Database seeding completed successfully!");
    console.log("=".repeat(50));

    // Summary
    const totalDocuments =
      seedData.users.length +
      seedData.crops.length +
      seedData.soilanalyses.length +
      seedData.cropmonitorings.length +
      seedData.products.length +
      seedData.orders.length +
      seedData.reviews.length +
      seedData.transactions.length +
      seedData.notifications.length +
      (seedData.conversations || []).length +
      (seedData.messages || []).length +
      seedData.croprecommendations.length +
      seedData.diseasedetections.length +
      seedData.weatheralerts.length +
      seedData.blogposts.length +
      seedData.forumposts.length +
      seedData.forumcomments.length +
      seedData.systemlogs.length;

    console.log("\n📊 Summary:");
    console.log(`Total Collections: 18`);
    console.log(`Total Documents Inserted: ${totalDocuments}`);
    console.log(`Database: agritech`);
    console.log("\n✨ All sample data has been imported successfully!");

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

// Run seeder
seedDatabase();
