const Collection = require("../models/collectionModel.js");
const Product = require("../models/productModel.js");
const SizeProduct = require("../models/sizeModel.js");
const { MultipleMongooseObject } = require("../utilities/Mongoose.js");
const sortCriteria = require("../utilities/sortCriteria.js");
const { error, success } = require("../utilities/responeApj.js");

class collectionController {
  // [GET] /news
  index(req, res, next) {
    Collection.find()
      .select("name slug thumbnail image")
      .then((collections) => {
        if (!collections) {
          res.status(404).json(error("Not Found", 404));
        } else {
          res
            .status(200)
            .json(success("Getting product successfully", collections, 200));
        }
      })
      .catch((e) => {
        next(e);
      });
  }
  // [POST]/ collection/create
  create(req, res) {
    if (!req.file) {
      res.status(400).json(error("Thumbnail must be imported", 404));
    } else {
      const newCollection = new Collection(req.body);
      newCollection.thumbnail = "img/product/" + req.file.filename;
      newCollection
        .save()
        .then((results) => {
          res
            .status(200)
            .json(success("Product is created successfully", results, 200));
        })
        .catch((e) => {
          next(e);
        });
    }
  }
  delete(req, res) {
    Collection.findOne({ slug: req.params.slug })
      .exec()
      .then((collectionToDelete) => {
        if (!collectionToDelete) {
          res.status(404).json(error("Collection Not Found", 404));
          return; // Exit the function if collection not found
        } else {
          const collectionId = collectionToDelete._id; // Extract collection ID

          Promise.all([
            // Update products to remove the collection reference
            Product.updateMany(
              { collection: { $in: [collectionId] } }, // Find products with the collection ID
              { $pull: { collection: collectionId } } // Remove the collection ID from their collection array
            ),
            // Delete the collection using its ID
            Collection.deleteOne({ _id: collectionId }),
          ])
            .then(() => {
              res
                .status(200)
                .json(
                  success(
                    `Collection ${collectionToDelete.name} successfully deleted.`,
                    {},
                    200
                  )
                );
            })
            .catch((error) => {
              res.status(500).json(error("Error deleting collection", 500));
            });
        }
      })
      .catch((error) => {
        res.status(500).json(error("Error finding collection", 500));
      });
  }
  getDetailCollection(req, res, next) {
    Collection.findOne({ slug: req.params.slug })
      .exec()
      .then(async (collection) => {
        if (!collection) {
          return res.status(404).json(error("Collection Not Found", 404)); // Specific error message
        }

        const { _id, name, description, thumbnail } = collection;

        // let sortCriteria = sortCriteria(req);
        let sortCriteria = {};
        let products = await Product.find({
          collection: { $in: [_id] },
        })
          .select("name price image slug stock description")
          .sort(sortCriteria);

        const totalLength = products.length;
        products = MultipleMongooseObject(products);
        for (const product of products) {
          if (!product.stock) {
            const sizes = await SizeProduct.find({
              product: product._id,
            }).select("size stock");
            product.sizes = sizes; // Assign sizes array to product if found
          }
        }

        res.status(200).json(
          success(
            "Getting Detail Collection successfully",
            {
              name,
              description,
              thumbnail,
              length: totalLength,
              data: products,
            },
            200
          )
        );
      })
      .catch((error) => {
        next(error);
      });
  }
  update(req, res) {
    if (req.file) {
      req.body.thumbnail = "img/collection/" + req.file.filename;
    }
    Collection.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    })
      .then((result) =>
        res
          .status(200)
          .json(success("Updating product information", result, 200))
      )
      .catch((err) => next(err));
  }
  async search(req, res, next) {
    const pipeline = [];
    pipeline.push({
      $search: {
        index: "searchCollections",
        wildcard: {
          query: `*${req.query.name}*`,
          path: "name",
          // fuzzy: {
          //   maxEdits: 2, // Maximum number of edits (e.g., insertions, deletions, substitutions) allowed
          //   prefixLength: 1, // Length of the prefix to be ignored during fuzzy matching
          // },
          // // Additional text analysis options can be added here
        },
      },
    });
    pipeline.push({
      $sort: { score: { $meta: "textScore" } },
    });
    pipeline.push({
      $limit: 10,
    });
    pipeline.push({ $project: { _id: 0, title: 1 } });
    try {
      const result = await Collection.aggregate(pipeline);
      res.status(200).json(success("Searching successfully", result, 200));
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new collectionController();
