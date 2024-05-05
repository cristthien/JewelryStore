const Order = require("../models/orderModel.js");
const OrderItem = require("../models/orderItemModel.js");
const Cart = require("../models/cartModel.js");
const mongoose = require("mongoose");
const {
  MultipleMongooseObject,
  SingleMongooseObject,
} = require("../utilities/Mongoose.js");
const lockingFunctions = require("../utilities/lockingFunctions.js");
const getProductByOrder = require("../utilities/getProductByOrder.js");
class orderController {
  // [GET] /news
  async index(req, res, next) {
    const { customerID } = req;
    try {
      const orders = await Order.find({ customer: customerID });
      const ordersWithProducts = await Promise.all(
        orders.map(async (order) => {
          // Get products for the current order
          const products = await getProductByOrder(order._id); // Assuming getProductByOrder retrieves products for an order
          return { order, products }; // Return order with associated products
        })
      );
      res.status(200).json({
        length: ordersWithProducts.length,
        orderDetail: ordersWithProducts,
      });
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    const { cartItems, stocks, customerID, addressOrder } = req;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const updatedStock = await lockingFunctions.acquireLocks(stocks, session);

      //Update the stock for all products
      for (var i = 0; i < stocks.length; i++) {
        updatedStock[i].stock = updatedStock[i].stock - cartItems[i].quantity;
        if (updatedStock[i].stock < 0) {
          throw new Error("Product is not sufficient for this order");
        }
        await updatedStock[i].save({ session });
      }

      const total = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0 // Initial accumulator value
      );
      const newOrder = new Order({
        customer: customerID,
        total: total,
        payment: req.paymentMethod,
        address: addressOrder,
      });
      await newOrder.save({ session });
      for (const item of cartItems) {
        const newitem = new OrderItem({
          quantity: item.quantity,
          product: item.product,
          order: newOrder._id,
        });
        if (item.size) {
          newitem.size = item.size;
        }
        await newitem.save({ session });
      }
      const cartItemIds = cartItems.map((item) => item._id);
      const cartDeleteQuery = { _id: { $in: cartItemIds } };

      // Delete the items from the Cart collection
      await Cart.deleteMany(cartDeleteQuery, { session });

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: error.message });
    } finally {
      // Release locks for all products
      res.status(200).json({ message: "Order is created successful" });
      await lockingFunctions.releaseLocks(stocks);
    }
  }

  async update(req, res) {
    const { customerID } = req;
    const result = await Order.findOneAndUpdate(
      {
        customer: customerID,
        _id: req.params.slug,
      },
      req.body,
      { new: true }
    );
    if (!result) {
      res.status(400).json({ message: "Order does not exist to modify" });
    } else {
      res.status(200).json(result);
    }
  }
}
module.exports = new orderController();
