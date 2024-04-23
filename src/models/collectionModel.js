const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const collectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  slug: { type: String, slug: "name" },
});
module.exports = mongoose.model("Collection", collectionSchema);
