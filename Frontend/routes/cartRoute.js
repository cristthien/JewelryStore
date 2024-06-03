const express = require("express");
const cartRoute = express.Router();
cartRoute.get("/", (req, res, next) => {
  const scripts = [
    { script: "../../assets/js/cart/cart.js" },
    { script: "../../assets/js/cart/cartHandler.js" },
  ];
  res.render("cart", { scripts });
});
module.exports = cartRoute;
