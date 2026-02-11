const express = require("express");
const multer = require("multer");
const path = require("path");
const Vendor = require("../models/Vendor");

const router = express.Router();

const VendorApplication = require("../models/VendorApplication");
const auth = require("../middlewares/authMiddleware");

// Public route - fetch only approved vendor applications
router.get("/vendor-applications", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const skip = parseInt(req.query.skip) || 0;

    const apps = await VendorApplication.find({ status: "approved" })
      .populate("user", "username email role")
      .skip(skip)
      .limit(limit);

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Multer storage -> save to public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

router.get("/by-category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    // Find approved vendors that have this category
    const vendors = await VendorApplication.find({
      categories: { $regex: new RegExp(category, "i") }, // case-insensitive match
      status: "approved", // only approved vendors
    });

    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const upload = multer({ storage });

const fs = require("fs");

router.post("/apply", auth(), upload.single("banner"), async (req, res) => {
  try {
    const userId = req.session.user.id;

    const existing = await VendorApplication.findOne({ user: userId, status: "pending" });
    if (existing) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // delete uploaded file
      }
      return res.status(400).json({ msg: "You already have a pending application." });
    }

    const app = await VendorApplication.create({
      user: userId,
      name: req.body.name,
      mobile: req.body.mobile,
      categories: JSON.parse(req.body.categories),
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      banner: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.json({ msg: "Application submitted. Await admin approval.", application: app });
  } catch (err) {
    console.error(err);

    // Clean up file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ msg: "Server error" });
  }
});

// POST vendor
router.post("/", upload.single("banner"), async (req, res) => {
  try {
    const { name, categories, address, latitude, longitude } = req.body;

    const newVendor = new Vendor({
      name,
      categories,
      address,
      latitude,
      longitude,
      banner: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor added successfully!", vendor: newVendor });
  } catch (error) {
    console.error("Error saving vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// (Optional) GET vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vendors" });
  }
});

module.exports = router;
