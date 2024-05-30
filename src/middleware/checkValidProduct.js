const Product = require("../models/productModel.js");
const { error } = require("../utilities/responeApj.js");
module.exports = (req, res, next) => {
  Product.findOne({ slug: req.body.slug })
    .then((product) => {
      if (!product) {
        res.status(200).json(error("Product not found", 404));
      } else {
        req.product = product;
        next();
      }
    })
    .catch((err) => next(err));
};
