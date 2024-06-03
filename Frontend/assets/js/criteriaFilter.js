module.exports = async (products, criteria) => {
  products = await filterProductsBySort(products, criteria.sortCriteria);

  products = await filterProductsByCategory(
    products,
    criteria.selectedCategories
  );

  products = await filterProductsByCollection(
    products,
    criteria.selectedCollections
  );
  return products;
};

async function filterProductsByCategory(products, selectedCategories) {
  if (selectedCategories.length == 0) {
    return products;
  }
  if (selectedCategories.includes("ring")) {
    selectedCategories.push("band");
    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      return (
        selectedCategories.some((category) =>
          productName.includes(category.toLowerCase())
        ) && !productName.includes("earrings")
      );
    });
  } else {
    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      return selectedCategories.some((category) =>
        productName.includes(category.toLowerCase())
      );
    });
  }
}

async function filterProductsByCollection(products, selectedCollections) {
  if (selectedCollections.length == 0) {
    return products;
  }

  return products.filter((product) => {
    const productCollections = product.collection;
    return productCollections.some((productCollection) =>
      selectedCollections.includes(productCollection)
    );
  });
}
async function filterProductsBySort(products, sortCriteria) {
  if (sortCriteria === "lowToHigh") {
    return products.sort((a, b) => a.price - b.price);
  } else if (sortCriteria === "highToLow") {
    return products.sort((a, b) => b.price - a.price);
  } else {
    return products;
  }
}
