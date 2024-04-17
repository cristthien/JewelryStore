const express = require("express");
const customerRoute = express.Router();

const customerController = require("../controllers/customerController.js");
customerRoute.get("/", customerController.index);

module.exports = customerRoute;
