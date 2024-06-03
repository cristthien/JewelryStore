const express = require("express");
const commentRoute = express.Router();
const checkAuthCustomer = require("../middleware/chechAuthCustomer.js");
const commentController = require("../controllers/commentController.js");
const checkValidCustomer = require("../middleware/checkValidCustomer.js");
const checkValidProduct = require("../middleware/checkValidProduct.js");
// Customer
commentRoute.post(
  "/",
  checkValidCustomer,
  checkValidProduct,
  commentController.create
);
commentRoute.put("/:commentID", checkValidCustomer, commentController.update);
commentRoute.delete(
  "/:commentID",
  checkValidCustomer,
  commentController.delete
);
commentRoute.get("/:slug", checkValidProduct, commentController.index);

module.exports = commentRoute;
