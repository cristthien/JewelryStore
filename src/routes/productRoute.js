const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/productController.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/product/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
productRoute.put(
  "/:slug",
  upload.array("images", 12),
  productController.update
);
productRoute.delete("/:slug", productController.delete);
productRoute.get("/:slug", productController.getDetailProduct);
productRoute.post("/", upload.array("images", 12), productController.create);
productRoute.get("/", productController.index);

module.exports = productRoute;
