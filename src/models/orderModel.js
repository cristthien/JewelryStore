const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
  total: { type: Number },
  status: {
    type: String,
    enum: ["Waiting", "Delivery", "Deliveried"],
    default: "Waiting",
  },
  createdAt: { type: Date, default: Date.now },
  payment: {
    type: String,
    enum: ["Cash on delivery", "Credit"],
    default: "Cash on delivery",
  },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
