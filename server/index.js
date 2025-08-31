require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use("/uploads", express.static("public/uploads"));

// Middleware
app.use(express.json());

// ✅ Allow both local and deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173",               // local dev
    "https://craveit-app-frontend.onrender.com" // deployed frontend
  ],
  credentials: true, // allow cookies
}));

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true if https
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// DB connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/vendors", vendorRoutes);
app.use("/admin", adminRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
