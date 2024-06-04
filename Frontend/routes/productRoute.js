const express = require("express");
const productRoute = express.Router();
const axios = require("axios");
const GetFirstTenProduct = require("../utilities/GetFirstTenProduct");

productRoute.get("/:slug", async (req, res) => {
  console.log(req.params.slug);
  const scripts = [
    { script: "../../assets/js/product/handler.js" },
    { script: "../../assets/js/product/clientHandler.js" },
  ];
  const { slug } = req.params;

  const path = `${process.env.SERVER}/product/${slug}`;

  try {
    var response = await axios.get(path);
    if (response.status != 200) {
      throw new Error("Product does not exits");
    } else {
      if (response.data.error) {
        throw new Error("Product does not exits");
      }
      const {
        name,
        price,
        description,
        image,
        slug,
        collection,
        sizes,
        stock,
      } = response.data.results;
      const representedCollection = collection[0];
      const [mainImage, ...restImage] = image;
      let disablebtn = false;
      if (stock === 0) {
        disablebtn = true;
      }
      const relatedCollectionProductsRespone = await axios.get(
        `${process.env.SERVER}/product/get-random-three-products/${representedCollection._id}`
      );
      const mayLikedProductsResponse = await axios.get(
        `${process.env.SERVER}/product/search/${name}`
      );
      const relatedCollectionProducts =
        relatedCollectionProductsRespone.data.results;

      const mayLikedProducts = mayLikedProductsResponse.data.results.products;
      const firstTenProducts = GetFirstTenProduct(mayLikedProducts);
      res.render("product", {
        scripts: scripts,
        representedCollection,
        name,
        description,
        price,
        mainImage,
        restImage,
        sizes,
        disablebtn,
        relatedCollectionProducts,
        firstTenProducts,
        slug,
      });
    }
  } catch (e) {
    console.log(e.message);
    res.render("404");
  }
});
module.exports = productRoute;
