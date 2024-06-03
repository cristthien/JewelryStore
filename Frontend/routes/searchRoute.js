const express = require("express");
const searchRounte = express.Router();
const axios = require("axios");
const criteriaFilter = require("../assets/js/criteriaFilter");

searchRounte.get("/", async (req, res) => {
  var scripts = [
    { script: "../../assets/js/productList/carouselProduct.js" },
    { script: "../../assets/js/productList/loadMore.js" },
    { script: "../../assets/js/productList/gridRender.js" },
    { script: "../../assets/js/productList/loadMoreOption.js" },
    { script: "../../assets/js/productList/categoryResponsive.js" },
    { script: "../../assets/js/search/searchHandler.js" },
  ];
  let searchText = req.query.q;
  try {
    if (!searchText) {
      throw new Error("Query is empty");
    }
    searchText = await decodeURIComponent(searchText);
    let respone = await axios.get(
      "http://localhost:3000/product/search/" + searchText
    );
    let payload = respone.data;
    if (payload.error) {
      throw new Error("Internal Server Error");
    }
    let { products } = payload.results;

    const criteria = {
      sortCriteria: req.query.sort,
      selectedCategories: req.query.categories
        ? req.query.categories.split(",")
        : [],
      selectedCollections: req.query.collections
        ? req.query.collections.split(",")
        : [],
    };
    products = await criteriaFilter(products, criteria);

    if (products.length == 0) {
      throw new Error("Product not found");
    }
    res.render("search", {
      products: products,
      length: products.length,
      q: searchText,
      scripts: scripts,
      criteria: criteria,
    });
  } catch (e) {
    let respone = await axios.get(
      "http://localhost:3000/product/search/diamond"
    );
    let payload = respone.data;

    res.render("searchNotFounded", {
      scripts: [
        { script: "../../assets/js/search/notFoundedSearchHandler.js" },
      ],
      products: payload.results.products,
    });
  }
});

module.exports = searchRounte;
