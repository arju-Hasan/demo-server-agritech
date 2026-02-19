const ForumPost = require("../models/forumPost.model");
const ForumComment = require("../models/forumComment.model");
const User = require("../models/user.model");

// Get all forum posts
exports.getAllPosts = async (req, res) => {
  try {
    const { category, status, page = 1, limit = 20, search } = req.query;
    
    let filterQuery = {};
    
    if (category) {
      filterQuery.category = category;
    }
    
    if (status) {
      filterQuery.status = status;
    }
    
    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const posts = await ForumPost.find(filterQuery)
      .populate("authorId", "username profile.firstName profile.lastName profile.avatar")
      .sort({ isPinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ForumPost.countDocuments(filterQuery);
    
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

// Get forum post by ID
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await ForumPost.findByIdAndUpdate(
      postId,
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

// Create forum post
exports.createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    const post = await ForumPost.create({
      title,
      description,
      category,
      authorId: req.user._id,
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

// Update forum post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description, category } = req.body;
    
    const post = await ForumPost.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        category,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    
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

// Delete forum post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await ForumPost.findByIdAndDelete(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    // Delete all comments related to this post
    await ForumComment.deleteMany({ postId });
    
    res.status(200).json({
      success: true,
      message: "Post and all comments deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete post",
    });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const comments = await ForumComment.find({ postId, parentCommentId: null })
      .populate("authorId", "username profile.firstName profile.lastName profile.avatar")
      .populate("replies", "-__v")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ForumComment.countDocuments({ postId, parentCommentId: null });
    
    res.status(200).json({
      success: true,
      data: {
        comments,
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
      message: error.message || "Failed to fetch comments",
    });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;
    
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    const comment = await ForumComment.create({
      postId,
      authorId: req.user._id,
      content,
      parentCommentId: parentCommentId || null,
    });
    
    // If reply, add to parent comment's replies
    if (parentCommentId) {
      await ForumComment.findByIdAndUpdate(
        parentCommentId,
        { $push: { replies: comment._id } }
      );
    }
    
    // Update post comment count
    post.commentCount += 1;
    await post.save();
    
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add comment",
    });
  }
};

// Like/Unlike post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    
    const post = await ForumPost.findById(postId);
    
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

// Mark post as solved
exports.markAsSolved = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    const comment = await ForumComment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    
    post.status = "solved";
    post.isSolved = true;
    post.solvedBy = commentId;
    await post.save();
    
    comment.isMarkedAsAnswer = true;
    await comment.save();
    
    res.status(200).json({
      success: true,
      message: "Post marked as solved",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to mark as solved",
    });
  }
};

// Moderate post (Management only)
exports.moderatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { action, reason } = req.body; // action: 'hide', 'show', 'pin', 'unpin'
    
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    if (action === "hide") {
      // post.isHidden = true; // If you have this field
    } else if (action === "show") {
      // post.isHidden = false;
    } else if (action === "pin") {
      post.isPinned = true;
    } else if (action === "unpin") {
      post.isPinned = false;
    }
    
    await post.save();
    
    res.status(200).json({
      success: true,
      message: `Post ${action}ed successfully`,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to moderate post",
    });
  }
};
