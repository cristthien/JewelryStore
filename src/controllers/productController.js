const Product = require("../models/productModel.js");
const SizeProduct = require("../models/sizeModel.js");
const { error, success } = require("../utilities/responeApj.js");
var _ = require("lodash");
const semanticProductSearch = require("../utilities/semanticProductSearch.js");
const refineDescription = require("../utilities/refineDescription.js");

const {
  SingleMongooseObject,
  MultipleMongooseObject,
} = require("../utilities/Mongoose.js");
const matchOptionGenerator = require("../utilities/matchOperationGenerator.js");
const fuzzyProductSearch = require("../utilities/fuzzyProductSearch.js");
const combineAndRemoveDuplicates = require("../utilities/combineWithoutDuplicate.js");
const getEmbedding = require("../utilities/embeddingGenerator.js");

class productController {
  // [GET] /news
  async index(req, res, next) {
    try {
      let products = await Product.find().select("name price image slug stock");
      const totalLength = products.length; // Calculate total length
      products = MultipleMongooseObject(products);

      // Efficient asynchronous size fetching using Promise.all
      const sizePromises = products.map((product) =>
        !product.stock
          ? SizeProduct.find({ product: product._id }).select("size stock")
          : Promise.resolve([])
      );
      const sizes = await Promise.all(sizePromises);
      for (let i = 0; i < products.length; i++) {
        products[i].sizes = sizes[i];
      }
      res.status(200).json(
        success(
          "Getting product information successfully",
          {
            length: totalLength,
            data: products,
          },
          200
        )
      );
    } catch (error) {
      next(err);
    }
  }

  async create(req, res, next) {
    req.body.image = req.files.map((file) => {
      return "img/product/" + file.filename;
    });
    if (req.body.sizes) {
      try {
        SizeProduct.insertMany(req.body.sizes);
      } catch (err) {
        next(err);
      }
    }
    req.body.name_embedding_hf = await getEmbedding(req.body.description);
    const newProduct = new Product(req.body);
    newProduct
      .save()
      .then((result) =>
        res
          .status(200)
          .json(success("Creating product successfully", newProduct, 200))
      )
      .catch((e) => next(e));
  }
  getDetailProduct(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .populate("collection", "name slug")
      .exec()
      .then((product) => {
        if (!product) {
          res.status(200).json(error("Not Found Product", 404));
        } else if (!product.stock) {
          const updatedProduct = SingleMongooseObject(product);
          delete updatedProduct.name_embedding_hf;
          SizeProduct.find({ product: updatedProduct._id })
            .select("size stock")
            .then((sizes) => {
              updatedProduct.sizes = sizes;
              res
                .status(200)
                .json(
                  success(
                    "Getting detail product successfully",
                    updatedProduct,
                    200
                  )
                );
            });
        } else {
          product.name_embedding_hf = null;

          res
            .status(200)
            .json(success("Getting detail product successfully", product, 200));
        }
      })
      .catch((e) => next(e));
  }
  update(req, res, next) {
    if (req.files) {
      req.body.image = req.files.map((file) => {
        return "img/product/" + file.filename;
      });
    }
    Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
      .then((result) =>
        res
          .status(200)
          .json(success("Updating product successfully", result, 200))
      )
      .catch((err) => next(err));
  }
  delete(req, res) {
    Product.findOneAndDelete({ slug: req.params.slug })
      .then(async (product) => {
        if (!product) {
          return res.status(200).json(error("Product not found", 404));
        }

        try {
          await SizeProduct.deleteMany({ product: product._id });
          res
            .status(200)
            .json(success("Product is deleted succesfully", {}, 200));
        } catch (err) {
          res.status(200).json(error("Error deleting product", 500));
        }
      })
      .catch((err) => {
        res.status(200).json(error("Error fetching product", 500));
      });
  }

  async searchProduct(req, res) {
    const query = req.params.slug;
    try {
      let fuzzyResults = await fuzzyProductSearch(query);
      const semanticResults = await semanticProductSearch(query);
      let results = combineAndRemoveDuplicates(fuzzyResults, semanticResults);
      results = refineDescription(results);
      res
        .status(200)
        .json(
          success(
            "Products are found",
            { length: results.length, products: results },
            200
          )
        );
    } catch (e) {
      res.status(200).json(e.message);
    }
  }
  async getRandomThreeProducts(req, res, next) {
    try {
      const { id } = req.params;

      let products = await Product.aggregate([
        { $match: { collection: { $in: [id] } } },
        { $sample: { size: 3 } },
        {
          $project: {
            name: 1,
            price: 1,
            description: 1,
            image: 1,
            slug: 1,
          },
        },
      ]);
      products = refineDescription(products);

      res
        .status(200)
        .json(success("Products is load successfull", products, 200));
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new productController();
