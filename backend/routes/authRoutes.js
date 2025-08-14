const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router();

//Auth Routes
router.post("/register", registerUser); //Register User
router.post("/login", loginUser); //login user
router.get("/profile", authenticate, getUserProfile); //get user profile

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imageUrl });
});

module.exports = router;
