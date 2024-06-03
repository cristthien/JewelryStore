const express = require("express");
const adminProduct = express.Router();

adminProduct.get("/add", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/insertStock.js" },
    { script: "../../assets/js/admin/textarea.js" },
    { script: "../../assets/js/admin/addProduct.js" },
    { script: "../../assets/js/admin/renderImage.js" },
    { script: "../../assets/js/admin/addProductHandler.js" },
  ];
  res.render("addProduct", { layout: "admin", scripts });
});
adminProduct.get("/:id", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/insertStock.js" },
    { script: "../../assets/js/admin/textarea.js" },
    { script: "../../assets/js/admin/productDetail.js" },
    { script: "../../assets/js/admin/renderImage.js" },
    { script: "../../assets/js/admin/productDetailHandler.js" },
  ];
  res.render("productDetail", { layout: "admin", scripts });
});
adminProduct.get("/", (req, res) => {
  const scripts = [
    { script: "../../assets/js/admin/popover.js" },
    { script: "../../assets/js/admin/productHandler.js" },
  ];
  res.render("adminProduct", { layout: "admin", scripts });
});
module.exports = adminProduct;
