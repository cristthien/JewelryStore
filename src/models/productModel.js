const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: [String], default: undefined },
  collection: { type: [String], ref: "Collection" },
  stock: { type: Number },
  slug: { type: String, slug: ["name", "price"] },
  name_embedding_hf: { type: [Number] },
});
module.exports = new mongoose.model("Product", productSchema);
