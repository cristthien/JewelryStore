const express = require("express");
const orderRoute = express.Router();
const orderController = require("../controllers/orderController.js");
const checkValidCustomer = require("../middleware/checkValidCustomer.js");
const CheckInStockProduct = require("../middleware/CheckInStockProduct.js");

orderRoute.post(
  "/",
  checkValidCustomer,
  CheckInStockProduct,
  orderController.create
);
orderRoute.put("/:slug", checkValidCustomer, orderController.update);
orderRoute.get("/", checkValidCustomer, orderController.index);

module.exports = orderRoute;
