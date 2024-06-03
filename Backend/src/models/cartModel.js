const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
  quantity: { type: Number, required: true },
  size: { type: Number },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
});
module.exports = mongoose.model("Cart", CartSchema);
