const axios = require("axios");

async function getCategories(req, res, next) {
  try {
    const response = await axios.get(process.env.SERVER + "/collection");
    const collections = response.data.results;

    let jewelry = [];
    let highJewelry = [];
    let accessories = [];
    for (const collection of collections) {
      switch (collection.tag) {
        case "jewelry":
          jewelry.push(collection);
          break;
        case "highJewelry":
          highJewelry.push(collection);
          break;
        default:
          accessories.push(collection);
          break;
      }
    }

    res.locals.categories = { jewelry, highJewelry, accessories };
    next(); // Call next() only after processing the data
  } catch (error) {
    res.locals.categories = { message: error.message };
    next(); // Call next() even if there's an error
  }
}

module.exports = getCategories;
