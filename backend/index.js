require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const url = require("url");
import { fileURLToPath } from "url";

const authRoutes = require("./routes/authRoutes");
const BlogPostRoutes = require("./routes/blogPostRoutes");
const commentRoutes = require("./routes/commentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

//Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//connect DB
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", BlogPostRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard-summary", dashboardRoutes);

app.use("/api/ai", aiRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//serve frontend static files
app.use(express.static(path.join(__dirname, "client/dist")));

//handle react router routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//start-server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
