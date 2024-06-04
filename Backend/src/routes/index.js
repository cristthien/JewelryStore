const customerRoute = require("./customerRoute.js");
const orderRoute = require("./orderRoute.js");
const productRoute = require("./productRoute.js");
const staffRoute = require("./staffRoute.js");
const collectionRoute = require("./collectionRoute.js");
const cartRoute = require("./cartRoute.js");
const commentRoute = require("./commentRoute.js");
const responseStatusServer = require("../utilities/responseStatusServer.js");

const mailer = require("../utilities/mailer.js");
const { error, success } = require("../utilities/responeApj.js");
const Subscriber = require("../models/subcriberModel.js");

function routes(app) {
  app.get("/subscriber", async (req, res) => {
    const { email } = req.query;

    if (!email) {
      return res.status(200).json(error("Email is required", 400));
    }

    try {
      // Check if the email is already registered
      const existingSubscriber = await Subscriber.findOne({ email });

      if (existingSubscriber) {
        return res.status(400).json(error("Email is already registered", 400));
      }

      // Insert the subscriber's email
      const newSubscriber = new Subscriber({ email });
      await newSubscriber.save();

      // Send thank-you email
      mailer.thankyouEmail(email, "Thank You for Subscribing - T&N Jewelry");

      res
        .status(200)
        .json(success("Email is registered successfully", {}, 200));
    } catch (e) {
      console.error(e);
      res.status(200).json(error("Internal Server Error", 500));
    }
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
