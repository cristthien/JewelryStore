const mongoose = require("mongoose");

const sizeProductSchema = mongoose.Schema({
  size: { type: Number, required: true },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  stock: { type: Number, required: true },
});
module.exports = mongoose.model("SizeProduct", sizeProductSchema);
