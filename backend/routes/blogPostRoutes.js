const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePost,
  deletePost,
  getPostsByTag,
  searchPosts,
  incrementView,
  likePost,
  getTopPosts,
} = require("../controllers/blogPostController");

const { authenticate } = require("../middlewares/authMiddleware");

//admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

router.post("/", authenticate, adminOnly, createPost);
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.put("/:id", authenticate, adminOnly, updatePost);
router.delete("/:id", authenticate, adminOnly, deletePost);
router.get("/tag/:tag", getPostsByTag);
router.get("/search", searchPosts);
router.post("/:id/view", incrementView);
router.post("/:id/like", authenticate, likePost);
router.get("/trending", getTopPosts);

module.exports = router;
