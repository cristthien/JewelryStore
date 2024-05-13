const getEmbedding = require("./embeddingGenerator");
const Product = require("../models/productModel.js");

async function main() {
  const query = "gaithien";
  try {
    // const embedding = await getEmbedding(query);
    // console.log(embedding.length);
    // console.log(embedding);
    const allProduct = await Product.find({}).limit(50);
    console.log(allProduct.length);
  } catch (err) {
    console.error(err);
  }
}

main();
