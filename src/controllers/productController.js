const Product = require("../models/productModel.js");
const getAll = require("../utilities/getAll.js");
const SizeProduct = require("../models/sizeModel.js");

const {
  SingleMongooseObject,
  MultipleMongooseObject,
} = require("../utilities/Mongoose.js");

class productController {
  // [GET] /news
  async index(req, res) {
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
      res.status(200).json({
        length: totalLength,
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  create(req, res) {
    req.body.image = req.files.map((file) => {
      return "img/product/" + file.filename;
    });
    if (req.body.sizes) {
      try {
        SizeProduct.insertMany(req.body.sizes);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Insert size product error", error: err });
      }
    }

    const newProduct = new Product(req.body);
    newProduct
      .save()
      .then((result) => res.status(200).json(result))
      .catch((e) => res.status(400).json(e));
  }
  getDetailProduct(req, res) {
    Product.findOne({ slug: req.params.slug })
      .exec()
      .then((product) => {
        if (!product) {
          res.status(404).json({ msg: "Not Found" });
        } else if (!product.stock) {
          const updatedProduct = SingleMongooseObject(product);
          SizeProduct.find({ product: updatedProduct._id })
            .select("size stock")
            .then((sizes) => {
              updatedProduct.sizes = sizes;
              res.status(200).json({ updatedProduct });
            });
        } else {
          res.status(200).json(product);
        }
      })
      .catch((e) => res.status(400).json(e));
  }
  update(req, res) {
    if (req.files) {
      req.body.image = req.files.map((file) => {
        return "img/product/" + file.filename;
      });
    }
    Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
  delete(req, res) {
    Product.findOneAndDelete({ slug: req.params.slug })
      .then(async (product) => {
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        try {
          await SizeProduct.deleteMany({ product: product._id });
          res.status(200).json({ message: "Product is deleted succesfully" });
        } catch (err) {
          res.status(500).json({ message: "Error deleting product" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Error fetching product" });
      });
  }
}
module.exports = new productController();
