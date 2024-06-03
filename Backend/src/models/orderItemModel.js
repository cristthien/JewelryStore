const mongoose = require("mongoose");
const orderItemModel = mongoose.Schema({
  quantity: { type: Number, required: true },
  size: { type: Number },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  order: { type: mongoose.Types.ObjectId, ref: "Order", required: true },
});
module.exports = mongoose.model("OrderItem", orderItemModel);
