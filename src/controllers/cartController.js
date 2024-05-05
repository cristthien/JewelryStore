const Cart = require("../models/cartModel.js");
const SizeProduct = require("../models/sizeModel.js");
class orderController {
  // [GET] /news
  index(req, res, next) {
    Cart.find({ customer: req.customerID })
      .populate("product", "name price image") // Include stock information
      .exec()
      .then((cartItems) => {
        if (!cartItems || cartItems.length === 0) {
          res.status(404).json({ message: "Cart is empty" });
        } else {
          const total = cartItems.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0 // Initial accumulator value
          );

          const outOfStockItems = cartItems.filter(
            (item) => item.quantity > item.product.stock
          );

          res.status(200).json({
            total: total,
            length: cartItems.length,
            products: cartItems,
            outOfStock: outOfStockItems.length > 0, // Indicate if any out-of-stock items exist
          });
        }
      })
      .catch((err) => next(err));
  }
  update(req, res, next) {
    const { product, customerID } = req;
    const productID = product._id;
    const { size } = req.body;
    const promises = [
      Cart.findOne({ product: productID, customer: customerID }),
      SizeProduct.find({ product: productID, size: size }),
    ];

    Promise.all(promises)
      .then((data) => {
        const [cartItem, sizeData] = data;
        let { quantity } = req.body;
        let stock = 0;
        if (product.stock) {
          stock = product.stock;
        } else if (sizeData.length) {
          stock = sizeData[0].stock;
        } else {
          return Promise.reject(new Error("Product or size not found"));
        }

        if (quantity > stock) {
          quantity = stock;
          console.log(stock);
        }
        if (!cartItem || req.body.new) {
          let newCartItem = new Cart({
            product: productID,
            customer: customerID,
            quantity: quantity,
          });
          if (sizeData.length) {
            newCartItem.size = sizeData[0].size;
          }
          newCartItem
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => next(err));
        } else {
          cartItem.quantity = quantity;
          if (sizeData.length) {
            cartItem.size = size;
          }
          cartItem
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  delete(req, res, next) {
    Cart.findOneAndDelete({ _id: req.body.cardItemID })
      .then((item) => {
        if (!item) {
          res.status(404).json({ message: "Item not found" });
        } else {
          res.status(200).json({ message: "Product is deleted" });
        }
      })
      .catch((err) => next(err));
  }
}
module.exports = new orderController();
