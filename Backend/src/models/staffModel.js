const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["manager", "staff"], required: true },
});
module.exports = mongoose.model("Staff", staffSchema);
