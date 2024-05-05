const mongoose = require("mongoose");
const productLockSchema = mongoose.Schema({
  product: { type: String },
  locked: Boolean,
});
module.exports = mongoose.model("ProductLock", productLockSchema);
