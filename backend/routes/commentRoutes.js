const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByPost,
  getAllComments,
  deleteComment,
} = require("../controllers/commentController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/:postId", authenticate, addComment);
router.get("/:postId", getCommentsByPost);
router.get("/", getAllComments);
router.delete("/:commentId", authenticate, deleteComment);

module.exports = router;
