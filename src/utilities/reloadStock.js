const Product = require("../models/productModel.js");
const SizeProduct = require("../models/sizeModel.js");
module.exports = async (productID) => {
  /*
      Prouduct A have size 1 have id1
      Product A have size 2 have id2
      product B have _id3  
      i treat them as productID for productLock
      so you use id ProductA to find to stock the function reload data will return not null
      */
  try {
    const promises = [
      Product.findOne({ _id: productID }).select("stock"),
      SizeProduct.findOne({ _id: productID }).select("stock"),
    ];
    return Promise.all(promises)
      .then((data) => {
        const [product, sizeProduct] = data;
        stock = 0;
        if (product && product.stock) {
          return product;
        } else if (sizeProduct) {
          return sizeProduct;
        } else if (product && !product.stock) {
          throw new Error(
            "Use the id of size Product to find the stock for this"
          );
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
