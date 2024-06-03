const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  rate: { type: Number, required: true },
  content: { type: String },
});
module.exports = mongoose.model("Comment", commentSchema);
