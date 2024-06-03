const express = require("express");
const adminOrder = express.Router();
const axios = require("axios");

adminOrder.get("/:slug", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/textarea.js" },
    { script: "../../assets/js/admin/orderDetail.js" },
  ];
  res.render("adminOrderDetail", { layout: "admin", scripts });
});
adminOrder.get("/", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/orderHandler.js" },
  ];
  res.render("adminOrder", { layout: "admin", scripts });
});
module.exports = adminOrder;
