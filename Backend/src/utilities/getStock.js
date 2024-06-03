const Product = require("../models/productModel.js");
const SizeProduct = require("../models/sizeModel.js");
module.exports = async (productID, size = null) => {
  try {
    const promises = [
      Product.findOne({ _id: productID }).select("stock"),
      SizeProduct.findOne({ product: productID, size: size }).select("stock"),
    ];
    return Promise.all(promises)
      .then((data) => {
        const [product, sizeProduct] = data;
        stock = 0;
        if (product.stock) {
          return product;
        } else if (sizeProduct.stock) {
          return sizeProduct;
        } else {
          throw new Error("Product does not exits");
        }
      })
      .catch((err) => {
        return null;
      });
  } catch (err) {
    return null;
  }
};
