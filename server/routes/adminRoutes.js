// routes/adminRoutes.js
const express = require("express");
const auth = require("../middlewares/authMiddleware");
const VendorApplication = require("../models/VendorApplication");
const Vendor = require("../models/Vendor");
const User = require("../models/User");
const sendMail = require("../config/mailer");


const router = express.Router();

router.get("/users/count", auth(["admin"]), async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get approved vendors count
router.get("/vendors/count", auth(["admin"]), async (req, res) => {
  try {
    const count = await Vendor.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get pending vendor applications count
router.get("/vendors/pending/count", auth(["admin"]), async (req, res) => {
  try {
    const count = await VendorApplication.countDocuments({ status: "pending" });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List applications
router.get("/vendor-applications", auth(["admin"]), async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    const apps = await VendorApplication.find(filter)
      .populate("user", "username email role")
      .sort({ createdAt: -1 }); 

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Approve application
router.patch("/vendor-applications/:id/approve", auth(["admin"]), async (req, res) => {
  try {
    const app = await VendorApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: "Application not found" });
    if (app.status !== "pending") return res.status(400).json({ msg: `Already ${app.status}` });

    // promote user
    const user = await User.findById(app.user);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.role = "vendor";
    await user.save();

    // create vendor profile
    const vendor = await Vendor.create({
      owner: app.user,
      name: app.name,
      mobile: app.mobile,
      categories: app.categories,
      address: app.address,
      latitude: app.latitude,
      longitude: app.longitude,
      banner: app.banner,
    });

    // update application status
    app.status = "approved";
    await app.save();

    await sendMail(
      user.email,
      "CraveIt : Your Vendor Application Has Been Approved",
      `<p>Hello <strong>${user.username}</strong>,</p>
       <p>Congratulations! Your vendor application for <strong>${app.name}</strong> has been <span style="color:green;font-weight:bold;">approved</span>.</p>
       <p>You can now log in to your account and start managing your vendor profile.</p>
       <p>Best regards,<br/>Team CraveIt</p>`
    );


    res.json({ msg: "Approved. User promoted to vendor.", vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject application
router.patch("/vendor-applications/:id/reject", auth(["admin"]), async (req, res) => {
  try {
    const app = await VendorApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: "Application not found" });
    if (app.status !== "pending") return res.status(400).json({ msg: `Already ${app.status}` });

    app.status = "rejected";
    app.adminNote = req.body.reason || app.adminNote;
    await app.save();

    const user = await User.findById(app.user);
    if (user) {
      await sendMail(
        user.email,
        "CraveIt : Your Vendor Application has been Rejected",
        `<p>Hello <strong>${user.username}</strong>,</p>
         <p>We regret to inform you that your vendor application for <strong>${app.name}</strong> has been <span style="color:red;font-weight:bold;">rejected</span>.</p>
         ${req.body.reason ? `<p><b>Reason:</b> ${req.body.reason}</p>` : ""}
         <p>You may apply again with updated details.</p>
         <p>– Team CraveIt</p>`
      )
    }

    res.json({ msg: "Application rejected." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
