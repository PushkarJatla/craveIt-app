const mongoose = require("mongoose");

const VendorApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // applicant
  name: { type: String, required: true },
  mobile: String,
  categories: { type: [String], required: true },
  address: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude:{ type: String, required: true },
  banner: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  adminNote: String,
}, { timestamps: true });

module.exports = mongoose.model("VendorApplication", VendorApplicationSchema);
