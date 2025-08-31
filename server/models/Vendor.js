const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  owner:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:    { type: String, required: true },
  mobile:    String,
  categories: { type: [String], required: true },
  address: { type: String, required: true },
  latitude:{ type: String, required: true },
  longitude:{ type: String, required: true },
  banner:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Vendor", VendorSchema);
