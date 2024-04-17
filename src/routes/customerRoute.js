const express = require("express");
const customerRoute = express.Router();
const checkAuthCustomer = require("../middleware/chechAuthCustomer.js");

const customerController = require("../controllers/customerController.js");
customerRoute.post("/signup", customerController.signup);
customerRoute.post("/login", customerController.login);
customerRoute.get(
  "/:customerID",
  checkAuthCustomer,
  customerController.getDetailInfo
);
customerRoute.get("/", customerController.index);

module.exports = customerRoute;
