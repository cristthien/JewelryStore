const Product = require("../models/productModel.js");
module.exports = (req, res, next) => {
  Product.findOne({ slug: req.body.slug })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        req.product = product;
        next();
      }
    })
    .catch((err) => res.status(500).json(err));
};
