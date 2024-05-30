const express = require("express");
const customerRoute = express.Router();
const checkAuthCustomer = require("../middleware/chechAuthCustomer.js");
const customerController = require("../controllers/customerController.js");
const checkValidateSignUp = require("../middleware/checkValidateSignUp.js");
const checkValidCustomer = require("../middleware/checkValidCustomer.js");
// Customer
customerRoute.post("/signup", checkValidateSignUp, customerController.signup);
customerRoute.post("/login", customerController.login);
customerRoute.get("/verify", customerController.verify);
customerRoute.post("/resetPassword", customerController.reset);
customerRoute.post(
  "/changePassword",
  checkValidCustomer,
  customerController.change
);
customerRoute.post(
  "/registerResetPassword",
  customerController.registerResetPassword
);
customerRoute.post("/auth/google", customerController.loginWithGoogle);
customerRoute.get(
  "/:customerID",
  checkAuthCustomer,
  customerController.getDetailInfo
);
customerRoute.patch(
  "/:customerID",
  checkAuthCustomer,
  customerController.UpdateInfo
);

module.exports = customerRoute;
