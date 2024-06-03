const express = require("express");
const collectionRoute = express.Router();
const axios = require("axios");
const criteriaFilter = require("../assets/js/criteriaFilter");

collectionRoute.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const criteria = {
    sortCriteria: req.query.sort,
    selectedCategories: req.query.categories
      ? req.query.categories.split(",")
      : [],
    selectedCollections: req.query.collections
      ? req.query.collections.split(",")
      : [],
  };

  var scripts = [
    { script: "../../assets/js/productList/carouselProduct.js" },
    { script: "../../assets/js/productList/loadMore.js" },
    { script: "../../assets/js/productList/gridRender.js" },
    { script: "../../assets/js/productList/loadMoreOption.js" },
    { script: "../../assets/js/productList/categoryResponsive.js" },
    { script: "../../assets/js/collections/handler.js" },
  ];
  const path = `${process.env.SERVER}/collection/${slug}`;

  try {
    var response = await axios.get(path);
    if (response.status != 200) {
      throw new Error("Collection does not exits");
    } else {
      const { name, description, thumbnail, tag, length, data } =
        response.data.results;
      const products = await criteriaFilter(data, criteria);

      res.render("collections", {
        scripts: scripts,
        name: name,
        des: description,
        thum: thumbnail,
        tag: tag,
        length: products.length,
        products: products,
        criteria: criteria,
      });
    }
  } catch (e) {
    console.log(e.message);
    res.render("404");
  }
});
module.exports = collectionRoute;
