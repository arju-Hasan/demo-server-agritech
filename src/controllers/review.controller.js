const Review = require("../models/review.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user has ordered this product (if orderId provided)
    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order || order.userId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only review products you have ordered",
        });
      }
    }

    // Create review
    const review = await Review.create({
      userId: req.user.id,
      productId,
      orderId,
      rating,
      title,
      comment,
      images,
    });

    // Update product rating
    const reviews = await Review.find({ productId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(
      productId,
      {
        rating: averageRating,
        totalReviews: reviews.length,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reviews
exports.getReviews = async (req, res) => {
  try {
    const { productId, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let filter = { isApproved: true };

    if (productId) filter.productId = productId;

    const reviews = await Review.find(filter)
      .populate("userId", "profile.firstName profile.lastName profile.avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        reviews,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalReviews / limit),
          totalReviews,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Review By Id
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id)
      .populate("userId", "profile.firstName profile.lastName profile.avatar")
      .populate("productId", "name image price");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Review By Id
exports.updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment, images } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check authorization
    if (review.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own reviews",
      });
    }

    // Update review
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, title, comment, images },
      { new: true }
    );

    // Update product rating
    const reviews = await Review.find({ productId: review.productId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(
      review.productId,
      {
        rating: averageRating,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Review By Id
exports.deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check authorization
    if (review.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    await Review.findByIdAndDelete(id);

    // Update product rating
    const reviews = await Review.find({ productId: review.productId });
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    await Product.findByIdAndUpdate(
      review.productId,
      {
        rating: averageRating,
        totalReviews: reviews.length,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product Reviews (for product detail page)
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ productId, isApproved: true })
      .populate("userId", "profile.firstName profile.lastName profile.avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments({ productId, isApproved: true });

    // Calculate rating distribution
    const allReviews = await Review.find({ productId });
    const ratingDistribution = {
      5: allReviews.filter((r) => r.rating === 5).length,
      4: allReviews.filter((r) => r.rating === 4).length,
      3: allReviews.filter((r) => r.rating === 3).length,
      2: allReviews.filter((r) => r.rating === 2).length,
      1: allReviews.filter((r) => r.rating === 1).length,
    };

    res.status(200).json({
      success: true,
      data: {
        reviews,
        ratingDistribution,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalReviews / limit),
          totalReviews,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






