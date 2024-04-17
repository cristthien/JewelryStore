const express = require("express");
const staffRoute = express.Router();
const staffController = require("../controllers/staffController.js");

staffRoute.get("/", staffController.index);

module.exports = staffRoute;
