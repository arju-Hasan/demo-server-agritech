const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");

// Public routes
router.get("/", blogController.getAllPosts);
router.get("/:slug", blogController.getPostBySlug);

// Protected routes (requires authentication)
// Assuming you have auth middleware - adjust path as needed
// router.post("/", authenticate, authorize(["admin", "management"]), blogController.createPost);
// router.put("/:postId", authenticate, authorize(["admin", "management"]), blogController.updatePost);
// router.delete("/:postId", authenticate, authorize(["admin", "management"]), blogController.deletePost);
// router.post("/:postId/like", authenticate, blogController.likePost);

// Temporary routes without auth (comment out above and uncomment these for development)
router.post("/", blogController.createPost);
router.put("/:postId", blogController.updatePost);
router.delete("/:postId", blogController.deletePost);
router.post("/:postId/like", blogController.likePost);

module.exports = router;
