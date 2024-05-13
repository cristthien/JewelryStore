const Cart = require("../models/cartModel.js");
const getStock = require("../utilities/getStock.js");
const { SingleMongooseObject } = require("../utilities/Mongoose.js");
const { error } = require("../utilities/responeApj.js");

module.exports = async (req, res, next) => {
  const { customerID } = req;

  try {
    const cartItems = await Cart.find({ customer: customerID }).populate(
      "product",
      "price"
    );
    if (cartItems.length == 0) {
      res
        .status(400)
        .json(error("Cart does not contain any for ordering", 400));
    }
    stocks = [];
    insufficientStock = [];
    for (const item of cartItems) {
      const stockProduct = await getStock(item.product, item.size);
      if (!stockProduct) {
        return res
          .status(404)
          .json(
            error(
              `Product  ${item.product} with size ${item.size} not found)`,
              404
            )
          );
      } else if (stockProduct.stock < item.quantity) {
        insufficientItem = SingleMongooseObject(item);
        insufficientItem.currentStock = stockProduct.stock;
        insufficientStock.push(insufficientItem);
      } else if (stockProduct.stock >= item.quantity) {
        stocks.push(stockProduct);
      } else {
        throw new Error("Internal server error");
      }
    }
    if (insufficientStock.length == 0) {
      req.cartItems = cartItems;
      req.stocks = stocks;
      next();
    } else {
      res.status(405).json({
        insufficientItems: insufficientStock,
        message: "There are some product not enough stock",
        error: true,
        code: 405,
      });
    }
  } catch (err) {
    next(err);
  }
};
