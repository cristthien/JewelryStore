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
  "/change-password",
  checkValidCustomer,
  customerController.change
);
customerRoute.post(
  "/registerResetPassword",
  customerController.registerResetPassword
);
customerRoute.get("/verifyEmail", customerController.verifyEmail);
customerRoute.post(
  "/change-email",
  checkValidCustomer,
  customerController.changeEmailNotify
);

customerRoute.post("/auth/google", customerController.loginWithGoogle);
customerRoute.get("/orders", checkValidCustomer, customerController.getOrders);
customerRoute.get("/", checkValidCustomer, customerController.getDetailInfo);
customerRoute.post("/", checkValidCustomer, customerController.UpdateInfo);

module.exports = customerRoute;
