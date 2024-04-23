const express = require("express");
const staffRoute = express.Router();
const staffController = require("../controllers/staffController.js");
const checkAuthManager = require("../middleware/checkAuthManager.js");
const checkAuthStaff = require("../middleware/checkAuthStaff.js");
const checkAuthAdmin = require("../middleware/checkAuthAdmin.js");

staffRoute.get("/customer", checkAuthAdmin, staffController.getAllCustomer);
staffRoute.post("/signup", checkAuthManager, staffController.signup);
staffRoute.post("/login", staffController.login);
staffRoute.get("/:staffID", checkAuthStaff, staffController.getDetailStaff);
staffRoute.patch("/:staffID", checkAuthStaff, staffController.UpdateInfo);
staffRoute.get("/", checkAuthManager, staffController.index);

module.exports = staffRoute;
