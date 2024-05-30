const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  },
  password: { type: String },
  address: { type: String },
  phone: { type: String },
  dob: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  methodLogin: { type: String },
  verify: { type: Boolean, default: false },
});
module.exports = mongoose.model("Customer", customerSchema);
