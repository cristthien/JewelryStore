const express = require("express");
const adminRoute = express.Router();
const adminOrder = require("./adminOrder.js");
const adminCustomer = require("./adminCustomer.js");
const adminProduct = require("./adminProduct.js");

adminRoute.use("/products", adminProduct);
adminRoute.use("/customers", adminCustomer);
adminRoute.use("/orders", adminOrder);
adminRoute.get("/login", (req, res) => {
  const scripts = [
    { script: "../../assets/js/account/checkValid.js" },
    { script: "../../assets/js/admin/login.js" },
    { script: "../../assets/js/admin/loginHandler.js" },
  ];
  res.render("adminLogin", { layout: "none", scripts });
});
adminRoute.get("/", (req, res) => {
  var scripts = [{ script: "../../assets/js/admin/adminHandler.js" }];
  res.render("admin", { layout: "admin", scripts });
});
module.exports = adminRoute;
