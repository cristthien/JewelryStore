const express = require("express");
const orderRoute = express.Router();
const orderController = require("../controllers/orderController.js");
orderRoute.get("/", orderController.index);

module.exports = orderRoute;
