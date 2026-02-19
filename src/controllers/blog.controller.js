const BlogPost = require("../models/blogPost.model");
const User = require("../models/user.model");

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    
    let filterQuery = { isPublished: true };
    
    if (category) {
      filterQuery.category = category;
    }
    
    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const posts = await BlogPost.find(filterQuery)
      .populate("authorId", "username profile.firstName profile.lastName profile.avatar")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await BlogPost.countDocuments(filterQuery);
    
    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch posts",
    });
  }
};

// Get blog post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("authorId", "username profile.firstName profile.lastName profile.avatar");
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch post",
    });
  }
};

// Create blog post (Management/Admin only)
exports.createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, image, metaTitle, metaDescription, metaKeywords } = req.body;
    
    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    
    const post = await BlogPost.create({
      title,
      slug,
      content,
      excerpt,
      category,
      tags,
      image,
      metaTitle,
      metaDescription,
      metaKeywords,
      authorId: req.user._id,
      isPublished: false,
    });
    
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create post",
    });
  }
};

// Update blog post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, excerpt, category, tags, image, isPublished, metaTitle, metaDescription, metaKeywords } = req.body;
    
    let updateData = {
      title,
      content,
      excerpt,
      category,
      tags,
      image,
      metaTitle,
      metaDescription,
      metaKeywords,
      updatedAt: Date.now(),
    };
    
    if (isPublished && !title.startsWith("_")) {
      updateData.isPublished = isPublished;
      updateData.publishedAt = Date.now();
    }
    
    const post = await BlogPost.findByIdAndUpdate(postId, updateData, { new: true });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update post",
    });
  }
};

// Delete blog post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await BlogPost.findByIdAndDelete(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete post",
    });
  }
};

// Like/Unlike blog post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    
    const post = await BlogPost.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    const isLiked = post.likedBy.includes(userId);
    
    if (isLiked) {
      post.likedBy = post.likedBy.filter((id) => id.toString() !== userId.toString());
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }
    
    await post.save();
    
    res.status(200).json({
      success: true,
      message: isLiked ? "Like removed" : "Post liked",
      data: { liked: !isLiked, likes: post.likes },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to like post",
    });
  }
};
