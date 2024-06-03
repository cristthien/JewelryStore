module.exports = (products) => {
  // Eliminate the first 2 products
  let slicedProducts = products.slice(2);

  // If the length is higher than 10, take only the first 10 products
  if (slicedProducts.length > 10) {
    slicedProducts = slicedProducts.slice(0, 10);
  }

  // Shuffle the products
  for (let i = slicedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slicedProducts[i], slicedProducts[j]] = [
      slicedProducts[j],
      slicedProducts[i],
    ];
  }

  return slicedProducts;
};
