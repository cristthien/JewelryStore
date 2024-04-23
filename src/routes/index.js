const customerRoute = require("./customerRoute.js");
const orderRoute = require("./orderRoute.js");
const productRoute = require("./productRoute.js");
const staffRoute = require("./staffRoute.js");
const collectionRoute = require("./collectionRoute.js");

function routes(app) {
  app.use("/collection", collectionRoute);
  app.use("/customer", customerRoute);
  app.use("/order", orderRoute);
  app.use("/product", productRoute);
  app.use("/staff", staffRoute);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}
module.exports = routes;
