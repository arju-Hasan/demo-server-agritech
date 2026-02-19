const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forum.controller");

// Public routes
router.get("/", forumController.getAllPosts);
router.get("/:postId", forumController.getPostById);
router.get("/:postId/comments", forumController.getComments);

// Protected routes (requires authentication)
// Assuming you have auth middleware - adjust path as needed
// router.post("/", authenticate, forumController.createPost);
// router.put("/:postId", authenticate, forumController.updatePost);
// router.delete("/:postId", authenticate, forumController.deletePost);
// router.post("/:postId/comments", authenticate, forumController.addComment);
// router.post("/:postId/like", authenticate, forumController.likePost);
// router.post("/:postId/comments/:commentId/solve", authenticate, forumController.markAsSolved);
// router.patch("/:postId/moderate", authenticate, authorize(["admin", "management"]), forumController.moderatePost);

// Temporary routes without auth (comment out above and uncomment these for development)
router.post("/", forumController.createPost);
router.put("/:postId", forumController.updatePost);
router.delete("/:postId", forumController.deletePost);
router.post("/:postId/comments", forumController.addComment);
router.post("/:postId/like", forumController.likePost);
router.post("/:postId/comments/:commentId/solve", forumController.markAsSolved);
router.patch("/:postId/moderate", forumController.moderatePost);

module.exports = router;
