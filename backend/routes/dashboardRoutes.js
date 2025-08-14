const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");
const { getDashboardSummary } = require("../controllers/dashboardController");

//admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

router.get("/", authenticate, adminOnly, getDashboardSummary);

module.exports = router;
