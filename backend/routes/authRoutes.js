const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");
// const upload = require("../middlewares/uploadMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const streamifier = require("streamifier");
const router = express.Router();

//store in memory instead of disk
const upload = multer({ storage: multer.memoryStorage() });

//Auth Routes
router.post("/register", registerUser); //Register User
router.post("/login", loginUser); //login user
router.get("/profile", authenticate, getUserProfile); //get user profile

// router.post("/upload-image", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//     req.file.filename
//   }`;

//   res.status(200).json({ imageUrl });
// });

//upload image to cloudinary directly from memory
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "mern_uploads" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "image upload failed", error });
  }
});

module.exports = router;
