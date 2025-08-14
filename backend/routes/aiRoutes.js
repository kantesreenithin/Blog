const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const {
  geneateBlogPost,
  geneateBlogPostIdeas,
  generateCommentReply,
  generatePostSummary,
} = require("../controllers/aiController");

router.post("/generate", authenticate, geneateBlogPost);
router.post("/generate-ideas", authenticate, geneateBlogPostIdeas);
router.post("/generate-reply", authenticate, generateCommentReply);
router.post("/generate-summary", generatePostSummary);

module.exports = router;
