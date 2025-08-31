const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------------------
// SIGNUP - Request OTP
// ----------------------
router.post("/signup/request-otp", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.session.tempUser = { username, email, password: hashedPassword, otp, role: "user" };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error("Signup OTP Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// SIGNUP - Verify OTP
// ----------------------
router.post("/signup/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;

    if (!req.session.tempUser)
      return res.status(400).json({ msg: "No signup in progress" });

    if (String(req.session.tempUser.otp) !== String(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const newUser = new User({
      username: req.session.tempUser.username,
      email: req.session.tempUser.email,
      password: req.session.tempUser.password,
      role : req.session.tempUser.role,
    });

    await newUser.save();
    delete req.session.tempUser;

    res.json({ msg: "Signup successful!" });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ----------------------
// LOGIN
// ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    console.log(req.session.user);

    res.json({ msg: "Login successful", user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// Current User (Session)
// ----------------------
router.get("/currentuser", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Not authenticated" });
  }
  res.json({ user: req.session.user });
});

// ----------------------
// LOGOUT
// ----------------------
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Error logging out" });
    res.clearCookie("connect.sid");
    res.json({ msg: "Logged out successfully" });
  });
});

module.exports = router;
