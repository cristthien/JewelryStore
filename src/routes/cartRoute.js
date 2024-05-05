const express = require("express");
const cartRoute = express.Router();
const cartController = require("../controllers/cartController.js");
const checkValidCustomer = require("../middleware/checkValidCustomer.js");
const checkValidProduct = require("../middleware/checkValidProduct.js");
cartRoute.post(
  "/",
  checkValidCustomer,
  checkValidProduct,
  cartController.update
);
cartRoute.delete(
  "/",
  checkValidCustomer,
  checkValidProduct,
  cartController.delete
);
cartRoute.get("/", checkValidCustomer, cartController.index);

module.exports = cartRoute;
