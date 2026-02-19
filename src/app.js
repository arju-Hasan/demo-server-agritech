const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// middlewares
app.use(errorHandler);
app.use(cors());
app.use(express.json());

// routes
// Authentication
app.use("/auth", require("./routes/auth.routes"));

// User Management
app.use("/users", require("./routes/user.routes"));

// Marketplace - Products
app.use("/products", require("./routes/product.routes"));

// Orders
app.use("/orders", require("./routes/order.routes"));

// Transactions
app.use("/transactions", require("./routes/transaction.routes"));

// Notifications
app.use("/notifications", require("./routes/notification.routes"));

// Messages
app.use("/messages", require("./routes/message.routes"));

// Agricultural features
app.use("/soil", require("./routes/soil.routes"));
app.use("/crops", require("./routes/crop.routes"));
app.use("/guess-farming", require("./routes/guessFarming.routes"));
app.use("/crop-monitoring", require("./routes/cropMonitoring.routes"));
app.use("/disease", require("./routes/disease.routes"));
app.use("/weather", require("./routes/weather.routes"));
app.use("/reviews", require("./routes/review.routes"));

// Community features
app.use("/blog", require("./routes/blog.routes"));
app.use("/forum", require("./routes/forum.routes"));

// test route
app.get("/", (req, res) => {
  res.send("Agritech Server is running successfully!");
});

module.exports = app;
