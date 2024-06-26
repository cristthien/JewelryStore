const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/productController.js");
const multer = require("multer");
const checkAuthAdmin = require("../middleware/checkAuthAdmin.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/product/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
productRoute.post("/:id", upload.array("images", 12), productController.update);
productRoute.get(
  "/get-random-three-products/:id",
  productController.getRandomThreeProducts
);
productRoute.get("/search/:slug", productController.searchProduct);
productRoute.delete("/:slug", productController.delete);
productRoute.get("/:slug", productController.getDetailProduct);
productRoute.post("/", upload.array("images", 12), productController.create);
productRoute.get("/", productController.index);

module.exports = productRoute;
