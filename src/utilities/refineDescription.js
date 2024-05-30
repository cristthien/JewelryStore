const takeMaterialJewelry = require("./takeMaterialJewelry.js");
function refineDescription(products) {
  products.forEach((product) => {
    if (product.description) {
      product.description = takeMaterialJewelry(product.description);
    }
  });
  return products;
}

module.exports = refineDescription;
