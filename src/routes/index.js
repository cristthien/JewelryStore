const customerRoute = require("./customerRoute.js");
const orderRoute = require("./orderRoute.js");
const productRoute = require("./productRoute.js");
const staffRoute = require("./staffRoute.js");
const collectionRoute = require("./collectionRoute.js");
const cartRoute = require("./cartRoute.js");
const commentRoute = require("./commentRoute.js");

//test
const productModel = require("../models/productModel.js");
const getEmbedding = require("../utilities/embeddingGenerator.js");
const { MultipleMongooseObject } = require("../utilities/Mongoose.js");
const multer = require("multer");

function routes(app) {
  app.use("/cart", cartRoute);
  app.use("/collection", collectionRoute);
  app.use("/customer", customerRoute);
  app.use("/order", orderRoute);
  app.use("/product", productRoute);
  app.use("/comment", commentRoute);
  app.use("/staff", staffRoute);

  //  test

  app.use("/solve", async (req, res) => {
    try {
      // Update all products with embedding vectors (bulk update)
      const updatedProducts = await productModel.find({
        name_embedding_hf: null,
      });
      // Update each product with its corresponding embedding (loop)
      res.json(updatedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
module.exports = routes;
