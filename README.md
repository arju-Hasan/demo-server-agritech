# API Routes & Endpoints Documentation

## Smart Farming Platform - Complete API Reference

**Base URL:** `http://localhost:8080/api/v1`  
**Authentication:** JWT Token in `Authorization: Bearer <token>` header  
**Created:** February 19, 2026

---

## Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Crops](#crops)
4. [Soil Analysis](#soil-analysis)
5. [Crop Monitoring](#crop-monitoring)
6. [Products](#products)
7. [Orders](#orders)
8. [Reviews](#reviews)
9. [Transactions](#transactions)
10. [Notifications](#notifications)
11. [Messages](#messages)
12. [Blog](#blog)
13. [Forum](#forum)
14. [Crop Recommendations (Guess Farming)](#crop-recommendations)
15. [Disease Detection](#disease-detection)
16. [Weather](#weather)

---

## Authentication

### Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "email": "farmer@example.com",
  "username": "farmer123",
  "password": "SecurePass123!",
  "role": "farmer",
  "profile": {
    "firstName": "আব্দুল",
    "lastName": "করিম",
    "phone": "01712345678",
    "address": {
      "division": "Dhaka",
      "district": "Gazipur",
      "upazila": "Kaliakoir"
    }
  }
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "farmer@example.com",
    "username": "farmer123",
    "role": "farmer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "farmer@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "farmer@example.com",
    "username": "farmer123",
    "role": "farmer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Refresh Token
```
POST /auth/refresh-token
Content-Type: application/json

Request Body:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (200):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Users

### Get Current User Profile
```
GET /users/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "farmer@example.com",
    "username": "farmer123",
    "role": "farmer",
    "status": "active",
    "profile": {
      "firstName": "আব্দুল",
      "lastName": "করিম",
      "phone": "01712345678"
    },
    "farmerData": {
      "farmSize": 5,
      "farmingExperience": 10,
      "crops": ["rice", "wheat", "potato"]
    }
  }
}
```

### Get All Users (Admin Only)
```
GET /users?role=farmer&status=active&page=1&limit=20
Authorization: Bearer <admin_token>

Query Parameters:
- role: farmer | seller | admin
- status: active | inactive | blocked
- page: 1 (default)
- limit: 20 (default)
- search: search by username/email

Response (200):
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "username": "farmer123",
        "email": "farmer@example.com",
        "role": "farmer",
        "status": "active"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

### Get Specific User
```
GET /users/:userId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "farmer@example.com",
    "username": "farmer123",
    "profile": {...}
  }
}
```

### Update User Profile
```
PUT /users/:userId
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "profile": {
    "firstName": "আব্দুল",
    "lastName": "করিম",
    "phone": "01712345678"
  }
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {...}
}
```

### Update Farmer Data
```
PUT /users/:userId/farmer-data
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "farmSize": 5,
  "farmingExperience": 10,
  "crops": ["rice", "wheat", "potato"]
}

Response (200):
{
  "success": true,
  "message": "Farmer data updated",
  "data": {...}
}
```

### Delete User
```
DELETE /users/:userId
Authorization: Bearer <admin_token>

Response (200):
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Crops

### Get All Crops
```
GET /crops?category=cereal&season=kharif&page=1&limit=10
Authorization: Bearer <token>

Query Parameters:
- category: cereal | vegetable | pulses | oilseed
- season: kharif | rabi | summer
- page: 1 (default)
- limit: 10 (default)
- search: search by crop name

Response (200):
{
  "success": true,
  "data": {
    "crops": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Rice",
        "bannedName": "ধান",
        "category": "cereal",
        "season": "kharif",
        "climate": {...},
        "soilRequirements": {...},
        "commonPests": [...],
        "commonDiseases": [...],
        "marketPrice": {...}
      }
    ],
    "pagination": {...}
  }
}
```

### Get Single Crop
```
GET /crops/:cropId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Rice",
    "description": "Staple cereal crop grown in tropical regions",
    "category": "cereal",
    "season": "kharif",
    "climate": {
      "minTemperature": 20,
      "maxTemperature": 35,
      "minRainfall": 1200,
      "maxRainfall": 2250
    },
    "soilRequirements": {...},
    "growthStages": [...],
    "harvestingInfo": {...},
    "commonPests": [...],
    "commonDiseases": [...],
    "marketPrice": {...}
  }
}
```

### Create Crop (Admin Only)
```
POST /crops
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "name": "Wheat",
  "bannedName": "গম",
  "category": "cereal",
  "season": "rabi",
  "climate": {...},
  "soilRequirements": {...}
}

Response (201):
{
  "success": true,
  "message": "Crop created successfully",
  "data": {...}
}
```

### Update Crop (Admin Only)
```
PUT /crops/:cropId
Authorization: Bearer <admin_token>
Content-Type: application/json

Response (200):
{
  "success": true,
  "message": "Crop updated",
  "data": {...}
}
```

---

## Soil Analysis

### Create Soil Analysis
```
POST /soil
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "soilData": {
    "pH": 6.5,
    "moisture": 65,
    "nitrogen": 250,
    "phosphorus": 20,
    "potassium": 180,
    "organicMatter": 2.5
  },
  "location": {
    "division": "Dhaka",
    "district": "Gazipur",
    "upazila": "Kaliakoir",
    "village": "Konabari"
  }
}

Response (201):
{
  "success": true,
  "message": "Soil analysis created",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    "soilData": {...},
    "recommendations": {
      "fertilizers": [...],
      "crops": ["Rice", "Wheat", "Potato"]
    }
  }
}
```

### Get User's Soil Analysis
```
GET /soil?page=1&limit=10
Authorization: Bearer <farmer_token>

Response (200):
{
  "success": true,
  "data": {
    "analyses": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "soilData": {...},
        "recommendations": {...},
        "analysisDate": "2026-02-10T09:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Single Soil Analysis
```
GET /soil/:soilId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {...}
}
```

### Update Soil Analysis
```
PUT /soil/:soilId
Authorization: Bearer <farmer_token>
Content-Type: application/json

Response (200):
{
  "success": true,
  "message": "Soil analysis updated",
  "data": {...}
}
```

### Delete Soil Analysis
```
DELETE /soil/:soilId
Authorization: Bearer <farmer_token>

Response (200):
{
  "success": true,
  "message": "Soil analysis deleted"
}
```

---

## Crop Monitoring

### Create Crop Monitoring
```
POST /crop-monitoring
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "cropId": "507f1f77bcf86cd799439013",
  "cropName": "Rice",
  "farmSize": 5,
  "plantingDate": "2026-01-20T06:00:00Z",
  "location": {
    "division": "Dhaka",
    "district": "Gazipur",
    "field": "Main Field"
  }
}

Response (201):
{
  "success": true,
  "message": "Crop monitoring started",
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "userId": "507f1f77bcf86cd799439011",
    "cropId": "507f1f77bcf86cd799439013",
    "status": "growing"
  }
}
```

### Get User's Crop Monitoring
```
GET /crop-monitoring?status=growing&page=1&limit=10
Authorization: Bearer <farmer_token>

Query Parameters:
- status: growing | completed | harvesting | stopped

Response (200):
{
  "success": true,
  "data": {
    "monitorings": [
      {
        "_id": "507f1f77bcf86cd799439017",
        "cropName": "Rice",
        "growthStage": "Vegetative",
        "healthStatus": "excellent",
        "status": "growing"
      }
    ],
    "pagination": {...}
  }
}
```

### Update Monitoring Record
```
PUT /crop-monitoring/:monitoringId
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "growthStage": "Flowering",
  "healthStatus": "good",
  "activities": [
    {
      "date": "2026-02-15T08:00:00Z",
      "type": "irrigation",
      "description": "Applied water",
      "details": "5 inch water applied"
    }
  ]
}

Response (200):
{
  "success": true,
  "message": "Monitoring updated",
  "data": {...}
}
```

### Add Monitoring Record
```
POST /crop-monitoring/:monitoringId/records
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "date": "2026-02-15T10:00:00Z",
  "moisture": 65,
  "temperature": 28,
  "plantHeight": "25 cm",
  "leafColor": "Green",
  "notes": "Plant growth is satisfactory"
}

Response (201):
{
  "success": true,
  "message": "Monitoring record added",
  "data": {...}
}
```

---

## Products

### Get All Products
```
GET /products?category=seeds&page=1&limit=20
Authorization: Bearer <token>

Query Parameters:
- category: seeds | fertilizers | pesticides | tools
- page: 1
- limit: 20
- search: search term
- sort: price | rating | newest

Response (200):
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "507f1f77bcf86cd799439019",
        "name": "Certified Rice Seeds",
        "category": "seeds",
        "price": 450,
        "stock": 150,
        "rating": 4.7,
        "totalReviews": 45,
        "image": "https://cdn.example.com/products/rice-seeds.jpg"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Single Product
```
GET /products/:productId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439019",
    "name": "Certified Rice Seeds",
    "description": "High-yield certified rice seeds",
    "category": "seeds",
    "price": 450,
    "stock": 150,
    "rating": 4.7,
    "totalReviews": 45,
    "specifications": {...}
  }
}
```

### Create Product (Seller Only)
```
POST /products
Authorization: Bearer <seller_token>
Content-Type: application/json

Request Body:
{
  "name": "Certified Rice Seeds",
  "description": "High-yield seeds",
  "category": "seeds",
  "price": 450,
  "stock": 150,
  "specifications": {...}
}

Response (201):
{
  "success": true,
  "message": "Product created",
  "data": {...}
}
```

### Update Product (Seller Only)
```
PUT /products/:productId
Authorization: Bearer <seller_token>
Content-Type: application/json

Response (200):
{
  "success": true,
  "message": "Product updated",
  "data": {...}
}
```

### Delete Product (Seller Only)
```
DELETE /products/:productId
Authorization: Bearer <seller_token>

Response (200):
{
  "success": true,
  "message": "Product deleted"
}
```

---

## Orders

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439019",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "আব্দুল করিম",
    "phone": "01712345678",
    "division": "Dhaka",
    "district": "Gazipur",
    "address": "House 123, Main Road"
  },
  "paymentMethod": "mobile_banking"
}

Response (201):
{
  "success": true,
  "message": "Order created",
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "orderId": "ORD-2026-001001",
    "items": [...],
    "total": 1085,
    "status": "pending"
  }
}
```

### Get User's Orders
```
GET /orders?status=pending&page=1&limit=10
Authorization: Bearer <token>

Query Parameters:
- status: pending | confirmed | processing | shipped | delivered | cancelled

Response (200):
{
  "success": true,
  "data": {
    "orders": [
      {
        "_id": "507f1f77bcf86cd799439021",
        "orderId": "ORD-2026-001001",
        "items": [...],
        "total": 1085,
        "status": "pending",
        "createdAt": "2026-02-15T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Single Order
```
GET /orders/:orderId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {...}
}
```

### Cancel Order
```
POST /orders/:orderId/cancel
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Order cancelled",
  "data": {...}
}
```

### Track Order
```
GET /orders/:orderId/track
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "orderId": "ORD-2026-001001",
    "status": "shipped",
    "trackingNumber": "BD-2026-001001",
    "estimatedDelivery": "2026-02-20T06:00:00Z",
    "statusHistory": [
      {status: "pending", timestamp: "2026-02-15T10:30:00Z"},
      {status: "confirmed", timestamp: "2026-02-15T11:00:00Z"}
    ]
  }
}
```

---

## Reviews

### Create Review
```
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "productId": "507f1f77bcf86cd799439019",
  "orderId": "507f1f77bcf86cd799439021",
  "rating": 5,
  "title": "Excellent quality seeds",
  "comment": "The seeds germinated well and plants grew healthy"
}

Response (201):
{
  "success": true,
  "message": "Review posted",
  "data": {
    "_id": "507f1f77bcf86cd799439023",
    "rating": 5,
    "title": "Excellent quality seeds",
    "isApproved": false
  }
}
```

### Get Product Reviews
```
GET /reviews/product/:productId?page=1&limit=10
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439023",
        "userId": {...},
        "rating": 5,
        "title": "Excellent quality seeds",
        "comment": "...",
        "helpful": 12
      }
    ],
    "pagination": {...}
  }
}
```

### Mark Review Helpful
```
POST /reviews/:reviewId/helpful
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Marked as helpful",
  "data": {...}
}
```

---

## Transactions

### Get User Transactions
```
GET /transactions?type=purchase&page=1&limit=20
Authorization: Bearer <token>

Query Parameters:
- type: purchase | refund | withdrawal
- status: pending | completed | failed

Response (200):
{
  "success": true,
  "data": {
    "transactions": [
      {
        "_id": "507f1f77bcf86cd799439025",
        "transactionId": "TXN-2026-001001",
        "amount": 1085,
        "type": "purchase",
        "status": "completed",
        "date": "2026-02-15T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Transaction Details
```
GET /transactions/:transactionId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {...}
}
```

---

## Notifications

### Get User Notifications
```
GET /notifications?isRead=false&page=1&limit=20
Authorization: Bearer <token>

Query Parameters:
- isRead: true | false
- type: order_shipped | product_review | payment_received
- priority: high | medium | low

Response (200):
{
  "success": true,
  "data": {
    "notifications": [
      {
        "_id": "507f1f77bcf86cd799439027",
        "type": "order_shipped",
        "title": "Your order has been shipped",
        "message": "Order ORD-2026-001001 has been shipped",
        "isRead": false,
        "priority": "high",
        "createdAt": "2026-02-17T14:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Mark Notification as Read
```
POST /notifications/:notificationId/read
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Marked as read",
  "data": {...}
}
```

### Mark All Notifications as Read
```
POST /notifications/read-all
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### Delete Notification
```
DELETE /notifications/:notificationId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Messages

### Get Conversations
```
GET /messages/conversations?page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "conversations": [
      {
        "_id": "507f1f77bcf86cd799439029",
        "participants": [...],
        "lastMessage": "When will the next batch be available?",
        "lastMessageTime": "2026-02-18T10:15:00Z",
        "unreadCount": 2
      }
    ],
    "pagination": {...}
  }
}
```

### Get Messages in Conversation
```
GET /messages/:conversationId?page=1&limit=50
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "507f1f77bcf86cd799439030",
        "senderId": "507f1f77bcf86cd799439011",
        "message": "Hi, interested in bulk rice seeds",
        "isRead": true,
        "createdAt": "2026-02-10T09:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Send Message
```
POST /messages
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "receiverId": "507f1f77bcf86cd799439012",
  "message": "What are your rates for bulk orders?"
}

Response (201):
{
  "success": true,
  "message": "Message sent",
  "data": {...}
}
```

---

## Blog

### Get All Blog Posts
```
GET /blog?category=farming-tips&page=1&limit=10
Authorization: Bearer <token>

Query Parameters:
- category: farming-tips | pest-management | soil-health
- page: 1
- limit: 10
- search: search term
- sort: newest | popular | trending

Response (200):
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "507f1f77bcf86cd799439037",
        "title": "10 Tips for Successful Rice Farming",
        "slug": "10-tips-for-successful-rice-farming",
        "excerpt": "Learn the 10 most important tips...",
        "category": "farming-tips",
        "image": "https://cdn.example.com/blog/rice-farming.jpg",
        "likes": 45,
        "views": 1250,
        "publishedAt": "2026-02-01T10:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Single Blog Post
```
GET /blog/:slug
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439037",
    "title": "10 Tips for Successful Rice Farming",
    "slug": "10-tips-for-successful-rice-farming",
    "content": "Full content here...",
    "excerpt": "...",
    "author": {...},
    "category": "farming-tips",
    "tags": ["rice", "farming", "tips", "yield"],
    "likes": 45,
    "views": 1250,
    "createdAt": "2026-02-01T10:00:00Z"
  }
}
```

### Create Blog Post (Admin/Author)
```
POST /blog
Authorization: Bearer <admin_token>
Content-Type: application/json

Request Body:
{
  "title": "10 Tips for Successful Rice Farming",
  "slug": "10-tips-for-successful-rice-farming",
  "content": "Rice farming requires proper planning...",
  "excerpt": "Learn the 10 most important tips...",
  "category": "farming-tips",
  "tags": ["rice", "farming", "tips"],
  "image": "file upload"
}

Response (201):
{
  "success": true,
  "message": "Blog post created",
  "data": {...}
}
```

### Update Blog Post (Admin/Author)
```
PUT /blog/:postId
Authorization: Bearer <admin_token>
Content-Type: application/json

Response (200):
{
  "success": true,
  "message": "Blog post updated",
  "data": {...}
}
```

### Like Blog Post
```
POST /blog/:postId/like
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Blog post liked",
  "data": {...}
}
```

### Delete Blog Post (Admin)
```
DELETE /blog/:postId
Authorization: Bearer <admin_token>

Response (200):
{
  "success": true,
  "message": "Blog post deleted"
}
```

---

## Forum

### Get All Forum Posts
```
GET /forum?category=soil-fertilizer&status=open&page=1&limit=20
Authorization: Bearer <token>

Query Parameters:
- category: soil-fertilizer | pest-disease | crop-selection | market
- status: open | solved | closed
- priority: high | medium | low
- page: 1
- limit: 20
- search: search term

Response (200):
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "507f1f77bcf86cd799439039",
        "title": "Best fertilizer for wheat cultivation",
        "description": "I'm planning to cultivate wheat on my 3-acre farm...",
        "author": {...},
        "category": "soil-fertilizer",
        "status": "solved",
        "views": 234,
        "likes": 8,
        "commentCount": 5,
        "isPinned": true,
        "priority": "high"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Single Forum Post
```
GET /forum/:postId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439039",
    "title": "Best fertilizer for wheat cultivation",
    "description": "...",
    "author": {...},
    "comments": [...]
  }
}
```

### Create Forum Post
```
POST /forum
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "title": "Best fertilizer for wheat cultivation",
  "description": "I'm planning to cultivate wheat on my 3-acre farm...",
  "category": "soil-fertilizer",
  "priority": "high"
}

Response (201):
{
  "success": true,
  "message": "Forum post created",
  "data": {...}
}
```

### Like Forum Post
```
POST /forum/:postId/like
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Post liked",
  "data": {...}
}
```

### Mark As Solved
```
POST /forum/:postId/solve
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "solvedBy": "507f1f77bcf86cd799439030"
}

Response (200):
{
  "success": true,
  "message": "Post marked as solved",
  "data": {...}
}
```

### Add Forum Comment
```
POST /forum/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "content": "For wheat cultivation, I recommend using NPK...",
  "parentCommentId": null
}

Response (201):
{
  "success": true,
  "message": "Comment added",
  "data": {...}
}
```

### Like Forum Comment
```
POST /forum/comments/:commentId/like
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Comment liked",
  "data": {...}
}
```

### Delete Forum Post (Author/Admin)
```
DELETE /forum/:postId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Forum post deleted"
}
```

---

## Crop Recommendations (Guess Farming)

### Get Crop Recommendations
```
POST /guess-farming/recommend
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "soilAnalysisId": "507f1f77bcf86cd799439015",
  "farmSize": 5,
  "season": "kharif",
  "budget": 50000,
  "location": {
    "division": "Dhaka",
    "district": "Gazipur"
  }
}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439031",
    "recommendedCrops": [
      {
        "cropId": "507f1f77bcf86cd799439013",
        "cropName": "Rice",
        "suitabilityScore": 95,
        "expectedYield": "5-7 tons/acre",
        "harvestTime": "November - December",
        "estimatedCost": 45000,
        "estimatedProfit": 85000,
        "riskLevel": "low"
      }
    ],
    "financialAnalysis": {
      "totalInvestment": 45000,
      "expectedRevenue": 140000,
      "expectedProfit": 95000,
      "roi": 211
    }
  }
}
```

### Get User's Recommendations
```
GET /guess-farming?page=1&limit=10
Authorization: Bearer <farmer_token>

Response (200):
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "_id": "507f1f77bcf86cd799439031",
        "status": "selected",
        "selectedCrop": {...},
        "createdAt": "2026-02-01T08:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Recommendation Details
```
GET /guess-farming/:recommendationId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439031",
    "recommendedCrops": [...],
    "financialAnalysis": {...},
    "cultivationPlan": {...},
    "riskAnalysis": {...},
    "marketAdvisory": {...}
  }
}
```

### Select Crop from Recommendation
```
POST /guess-farming/:recommendationId/select
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "selectedCrop": "507f1f77bcf86cd799439013"
}

Response (200):
{
  "success": true,
  "message": "Crop selected",
  "data": {...}
}
```

---

## Disease Detection

### Upload Image for Disease Detection
```
POST /disease-detection/detect
Authorization: Bearer <farmer_token>
Content-Type: multipart/form-data

Form Data:
- image: file (jpg, png, jpeg)
- cropMonitoringId: "507f1f77bcf86cd799439017"

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439033",
    "cropName": "Rice",
    "detectionResults": {
      "diseaseName": "Rice Blast",
      "confidence": 94,
      "severity": "moderate",
      "affectedArea": "25% of the field"
    },
    "treatment": {
      "recommendedTreatment": [...],
      "pesticides": [...],
      "organicAlternatives": [...],
      "preventiveMeasures": [...]
    }
  }
}
```

### Get Detection History
```
GET /disease-detection?page=1&limit=20
Authorization: Bearer <farmer_token>

Response (200):
{
  "success": true,
  "data": {
    "detections": [
      {
        "_id": "507f1f77bcf86cd799439033",
        "cropName": "Rice",
        "diseaseName": "Rice Blast",
        "confidence": 94,
        "status": "under_treatment",
        "uploadDate": "2026-02-16T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### Get Detection Details
```
GET /disease-detection/:detectionId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {...}
}
```

---

## Weather

### Get Current Weather
```
GET /weather?division=Dhaka&district=Gazipur
Authorization: Bearer <token>

Query Parameters:
- division: Dhaka | Chattogram | Khulna | etc
- district: specific district
- lat: latitude
- lng: longitude

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439035",
    "location": {
      "division": "Dhaka",
      "district": "Gazipur",
      "coordinates": {lat: 24.0833, lng: 90.2167}
    },
    "currentWeather": {
      "temperature": 28.5,
      "humidity": 65,
      "windSpeed": 12,
      "condition": "Partly Cloudy",
      "feelsLike": 30,
      "uvIndex": 6
    },
    "forecast": [
      {
        "date": "2026-02-19T00:00:00Z",
        "temperature": {min: 22, max: 32},
        "condition": "Sunny",
        "rainfall": 0
      }
    ]
  }
}
```

### Get Weather Alerts
```
GET /weather/alerts?division=Dhaka
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "alerts": [
      {
        "alertType": "heavy_rain",
        "severity": "medium",
        "message": "Heavy rainfall expected in the next 2-3 days",
        "recommendedAction": "Prepare drainage systems",
        "issuedAt": "2026-02-18T10:00:00Z",
        "validUntil": "2026-02-20T18:00:00Z"
      }
    ],
    "farmingRecommendations": [...]
  }
}
```

### Subscribe to Weather Alerts
```
POST /weather/subscribe
Authorization: Bearer <farmer_token>
Content-Type: application/json

Request Body:
{
  "location": {
    "division": "Dhaka",
    "district": "Gazipur",
    "coordinates": {lat: 24.0833, lng: 90.2167}
  }
}

Response (201):
{
  "success": true,
  "message": "Weather alert subscription created",
  "data": {...}
}
```

---

## Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional details if available"
  }
}
```

### Common HTTP Status Codes:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Authentication Headers

All authenticated requests require:

```
Authorization: Bearer <jwt_token>
```

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MDc2NRcyfQ.K7gkr3pJ9aB4dE2fL8xN5oQmZ1hY6cX3vW9eS4tU2bA
```

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per user
- **Authentication Endpoints**: 5 attempts per 15 minutes per IP
- **Sensitive Operations**: 30 requests per 15 minutes per user

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1640765400
```

---

## Pagination

All paginated endpoints return:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## File Uploads

### Supported Formats:
- Images: JPG, PNG, JPEG (max 5MB)
- Documents: PDF (max 10MB)

### Upload Endpoint:
```
POST /upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <binary file>
- type: image | document

Response (200):
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/uploads/file-id.jpg",
    "fileId": "file-id",
    "size": 245000
  }
}
```

---

## Last Updated: February 19, 2026

For questions or issues with the API, contact: **api-support@smartfarming.com**
