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
    const textSearch = await productModel.find({
      collection: "66222aee2b6460c00f815810",
    });
    res.json(textSearch.length);
  });
}
module.exports = routes;
