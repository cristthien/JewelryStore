const Product = require("../models/productModel.js");
const matchOperationGenerator = require("../utilities/matchOperationGenerator.js");
module.exports = async (query) => {
  let pipeline = [];

  const searchStage = {
    $search: {
      index: "default",
      text: {
        query: query,
        path: "description",
        fuzzy: {
          maxEdits: 2,
          prefixLength: 2,
          maxExpansions: 50,
        },
      },
    },
  };
  pipeline.push(searchStage);
  // Stage 2: $matchStage
  const matchStage = matchOperationGenerator(query);
  if (matchStage) {
    console.log(matchStage);
    pipeline.push(matchStage);
  }

  // Stage 3: $limit stage
  const limitStage = { $limit: 30 };
  pipeline.push(limitStage);

  // Stage 4: $project stage
  const projectStage = {
    $project: {
      name: 1,
      image: 1,
      price: 1,
      description: 1,
    },
  };
  pipeline.push(projectStage);
  try {
    let results = await Product.aggregate(pipeline);
    return results;
  } catch (e) {
    console.log(e.message);
  }
};
