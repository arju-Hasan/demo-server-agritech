const Product = require("../models/product.model");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, image, images, specifications } = req.body;

    // Validate
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, category, and price are required",
      });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      image,
      images,
      specifications,
      sellerId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20, isActive = true } = req.query;

    let filter = { isActive };

    if (category) filter.category = category;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("sellerId", "profile.firstName profile.lastName profile.avatar sellerData.rating")
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
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

// Get Product By Id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(
      "sellerId",
      "profile.firstName profile.lastName email phone profile.avatar sellerData.rating sellerData.verified"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user is the seller
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot update another seller's product",
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user is the seller
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete another seller's product",
      });
    }

    // Delete product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Stock
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user is the seller
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot update another seller's product",
      });
    }

    product.stock += quantity;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Seller Products
exports.getSellerProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find({ sellerId: req.user.id })
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments({ sellerId: req.user.id });

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
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
