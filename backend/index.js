const express = require("express");
const mongoose = require("mongoose"); // Import mongoose for MongoDB connection
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const uploadImage = require("./src/utils/uploadImage");
const reviewRoutes = require("./src/reviews/reviews.router");

// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.get("/", (req, res) => {
  res.send("UniSell Ecommerce Server is Running..!");
});

app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/products", productRoutes); // Product management routes
app.use("/api/reviews", reviewRoutes);

// Image upload route
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
