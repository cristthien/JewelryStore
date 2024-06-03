const Cart = require("../models/cartModel.js");
const SizeProduct = require("../models/sizeModel.js");
const { error, success } = require("../utilities/responeApj.js");
const takeMaterialJewelry = require("../utilities/takeMaterialJewelry.js");

class orderController {
  // [GET] /news
  index(req, res, next) {
    Cart.find({ customer: req.customerID })
      .populate("product", "name price image description slug") // Include stock information
      .exec()
      .then((cartItems) => {
        cartItems.forEach((item) => {
          item.product.description = takeMaterialJewelry(
            item.product.description
          );
        });

        if (!cartItems || cartItems.length === 0) {
          res.status(200).json(error("Cart is empty", 404));
        } else {
          const total = cartItems.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0 // Initial accumulator value
          );

          const outOfStockItems = cartItems.filter(
            (item) => item.quantity > item.product.stock
          );

          res.status(200).json(
            success(
              "Getting cart successfully",
              {
                total: total,
                length: cartItems.length,
                products: cartItems,
                outOfStock: outOfStockItems.length > 0, // Indicate if any out-of-stock items exist
              },
              200
            )
          );
        }
      })
      .catch((err) => next(err));
  }
  update(req, res, next) {
    const { product, customerID } = req;
    const productID = product._id;
    const { size } = req.body;
    let promises = [];
    if (size) {
      promises = [
        Cart.findOne({ product: productID, customer: customerID, size: size }),
        SizeProduct.find({ product: productID, size: size }),
      ];
    } else {
      promises = [
        Cart.findOne({ product: productID, customer: customerID }),
        SizeProduct.find({ product: productID, size: size }),
      ];
    }

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
        const { more } = req.body;
        if (more && cartItem) {
          quantity = cartItem.quantity + 1;
        }
        if (quantity > stock) {
          quantity = stock;
        }
        if (!cartItem) {
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
              res
                .status(200)
                .json(success("Update cart successfully", result, 200));
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
              res
                .status(200)
                .json(success("Update cart successfully", result, 200));
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // async update(req, res, next) {
  //   const { product, customerID } = req;
  //   const productID = product._id;
  //   const { size, quantity } = req.body;
  //   if (size) {
  //     const promises = [
  //       Cart.findOne({ product: productID, customer: customerID, size: size }),
  //       SizeProduct.find({ product: productID, size: size }),
  //     ];
  //     Promise.all(promises).then((data) => {
  //       const [cartItem, sizeData] = data;
  //       let currQuantity = cartItem ? cartItem.quantity + quantity : quantity;
  //       let stock = sizeData ? sizeData.stock : 0;
  //       if (currQuantity > stock) {
  //         res.status(200).json(error("Add more product is "));
  //       }
  //     });
  //   } else {
  //     const cart = await Cart.findOne({
  //       product: productID,
  //       customer: customerID,
  //     });
  //     if (cart) {
  //     } else {
  //     }
  //   }
  // }

  delete(req, res, next) {
    const { customerID } = req;
    const { id } = req.query;
    Cart.findOneAndDelete({
      _id: id,
      customer: customerID,
    })
      .then((item) => {
        if (!item) {
          res.status(404).json(error("Item not found", 404));
        } else {
          res.status(200).json(success("Product is deleted", item, 200));
        }
      })
      .catch((err) => next(err));
  }
}
module.exports = new orderController();
