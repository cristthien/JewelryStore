const Collection = require("../models/collectionModel.js");
const Product = require("../models/productModel.js");
const SizeProduct = require("../models/sizeModel.js");
const { MultipleMongooseObject } = require("../utilities/Mongoose.js");
const sortCriteria = require("../utilities/sortCriteria.js");

class collectionController {
  // [GET] /news
  index(req, res) {
    Collection.find()
      .select("name slug thumbnail")
      .then((collections) => {
        if (!collections) {
          res.status(404).json({ message: "Not Found" });
        } else {
          res.status(200).json(collections);
        }
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  // [POST]/ collection/create
  create(req, res) {
    if (!req.file) {
      res.status(400).json({ msg: "Thumbnail must be imported" });
    } else {
      const newCollection = new Collection(req.body);
      newCollection.thumbnail = "img/product/" + req.file.filename;
      newCollection
        .save()
        .then((results) => {
          res.status(200).json(results);
        })
        .catch((e) => {
          res.status(500).json(e);
        });
    }
  }
  delete(req, res) {
    Collection.findOne({ slug: req.params.slug })
      .exec()
      .then((collectionToDelete) => {
        if (!collectionToDelete) {
          res.status(404).json({ message: "Collection Not Found" });
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
              res.status(200).json({
                message: `Collection ${collectionToDelete.name} successfully deleted.`,
              });
            })
            .catch((error) => {
              res
                .status(500)
                .json({ message: "Error deleting collection:", error });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Error finding collection:", error });
      });
  }
  getDetailCollection(req, res) {
    Collection.findOne({ slug: req.params.slug })
      .exec()
      .then(async (collection) => {
        if (!collection) {
          return res.status(404).json({ message: "Collection Not Found" }); // Specific error message
        }

        const { _id, name, description, thumbnail } = collection;

        let sortCriteria = sortCriteria(req);
        let products = await Product.find({
          collection: { $in: [_id] },
        })
          .select("name price image slug stock")
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

        res.status(200).json({
          name,
          description,
          thumbnail,
          length: totalLength,
          data: products,
        });
      })
      .catch((error) => {
        console.error("Error fetching collection details:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Generic error for client
      });
  }
  update(req, res) {
    if (req.file) {
      req.body.thumbnail = "img/collection/" + req.file.filename;
    }
    Collection.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
}
module.exports = new collectionController();
