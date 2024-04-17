const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/productController.js");

productRoute.get("/", productController.index);

module.exports = productRoute;
