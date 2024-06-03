const express = require("express");
const adminCustomer = express.Router();

adminCustomer.get("/:id", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/textarea.js" },
    { script: "../../assets/js/admin/customerDetail.js" },
  ];
  res.render("adminCustomerDetail", { layout: "admin", scripts });
});
adminCustomer.get("/", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/customerHandler.js" },
  ];
  res.render("adminCustomer", { layout: "admin", scripts });
});
module.exports = adminCustomer;
