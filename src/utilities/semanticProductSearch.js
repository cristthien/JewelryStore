const getEmbedding = require("./embeddingGenerator.js");
const matchOperationGenerator = require("./matchOperationGenerator.js");
const Product = require("../models/productModel.js");

module.exports = async (query) => {
  try {
    const queryEmbedding = await getEmbedding(query);

    let pipeline = [];
    const searchStage = {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: "name_embedding_hf",
        numCandidates: 200,
        limit: 10,
        index: "sematicSearch",
        // filter: { collection: "66222aee2b6460c00f815810" },
      },
    };
    pipeline.push(searchStage);
    const matchStage = matchOperationGenerator(query);
    console.log(matchStage);
    if (matchStage) {
      pipeline.push(matchStage);
    }
    const projectStage = {
      $project: {
        name: 1,
        image: 1,
        price: 1,
        description: 1,
        slug: 1,
        collection: 1,
      },
    };
    pipeline.push(projectStage);
    let results = await Product.aggregate(pipeline);
    return results;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};
