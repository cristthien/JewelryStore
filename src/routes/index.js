const customerRoute = require("./customerRoute.js");
const orderRoute = require("./orderRoute.js");
const productRoute = require("./productRoute.js");
const staffRoute = require("./staffRoute.js");
const collectionRoute = require("./collectionRoute.js");
const cartRoute = require("./cartRoute.js");
const commentRoute = require("./commentRoute.js");
const responseStatusServer = require("../utilities/responseStatusServer.js");

//test
const Product = require("../models/productModel.js");
const getEmbedding = require("../utilities/embeddingGenerator.js");
const { MultipleMongooseObject } = require("../utilities/Mongoose.js");
const multer = require("multer");
const Collection = require("../models/collectionModel.js");
const mailer = require("../utilities/mailer.js");

function routes(app) {
  //  test

  app.use("/verify", async (req, res) => {
    mailer.sendVerifyEmail(
      "nguyenthienchanel@gmail.com",
      "Verify Email",
      "giathien123"
    );
    res.send("Work oke");
  });
  app.use("/reset", async (req, res) => {
    mailer.sendResetPasswordEmail(
      "nguyenthienchanel@gmail.com",
      "Verify Email",
      "giathien123"
    );
    res.send("Work oke");
  });

  app.use("/cart", cartRoute);
  app.use("/collection", collectionRoute);
  app.use("/customer", customerRoute);
  app.use("/order", orderRoute);
  app.use("/product", productRoute);
  app.use("/comment", commentRoute);
  app.use("/staff", staffRoute);
  app.use("/", responseStatusServer);
}
module.exports = routes;
