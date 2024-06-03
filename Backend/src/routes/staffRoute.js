const express = require("express");
const staffRoute = express.Router();
const staffController = require("../controllers/staffController.js");
const checkAuthManager = require("../middleware/checkAuthManager.js");
const checkAuthStaff = require("../middleware/checkAuthStaff.js");
const checkAuthAdmin = require("../middleware/checkAuthAdmin.js");
const customerController = require("../controllers/customerController.js");

staffRoute.get("/orders/:id", checkAuthAdmin, staffController.getOrderDetail);
staffRoute.get("/orders", checkAuthAdmin, staffController.getAllOrders);
staffRoute.get(
  "/customer/:id",
  checkAuthAdmin,
  staffController.getDetailCustomer
);
staffRoute.get(
  "/products/:id",
  checkAuthAdmin,
  staffController.getDetailProduct
);
staffRoute.get("/customer", checkAuthAdmin, staffController.getAllCustomer);
staffRoute.post("/signup", checkAuthManager, staffController.signup);
staffRoute.post("/login", staffController.login);
staffRoute.get("/:staffID", checkAuthStaff, staffController.getDetailStaff);
staffRoute.patch("/:staffID", checkAuthStaff, staffController.UpdateInfo);
staffRoute.get("/", checkAuthManager, staffController.index);

module.exports = staffRoute;
