const Comment = require("../models/commentModel.js");
const OrderItem = require("../models/orderItemModel.js");
const Order = require("../models/orderModel.js");

class commentController {
  // [GET] /news
  async index(req, res, next) {
    // View theo productslug
    const { product } = req;
    try {
      const comments = await Comment.find({ product: product._id });
      res.status(200).json({
        length: comments.length,
        comments: comments,
      });
    } catch (err) {
      next(err);
    }
  }
  // [POST]/ collection/create
  async create(req, res, next) {
    const { customerID, product } = req;
    const { orderID, rate, content } = req.body;
    const availableComment = await Comment.findOne({
      customer: customerID,
      product: product._id,
      order: orderID,
    });
    if (availableComment) {
      console.log(availableComment);
      res.status(400).json({
        message: "Comment for this product already exsits. You can modify it",
      });
    } else {
      const order = await Order.findOne({ _id: orderID });
      if (!order || order.customer != customerID) {
        console.log(order);
        res.status(400).json({
          message: "You are not be customer who create this order",
        });
      } else {
        const orderItems = await OrderItem.findOne({
          order: orderID,
          product: product._id,
        });
        if (orderItems) {
          const newComment = new Comment({
            order: orderID,
            product: product._id,
            customer: customerID,
            rate: rate,
            content: content,
          });
          newComment
            .save()
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err));
        } else {
          res.status(400).json({
            message: `${product.name} does not exist in ${orderID}`,
          });
        }
      }
    }
  }
  async delete(req, res, next) {
    const { customerID } = req;
    const { commentID } = req.params;

    try {
      // Find the comment by its ID
      const comment = await Comment.findOne({ _id: commentID });
      // Check if the comment exists and if it belongs to the specified customer
      if (!comment || customerID !== comment.customer.toString()) {
        return res
          .status(400)
          .json({ message: "Deleting comment was unsuccessful" });
      } else {
        await Comment.deleteOne({ _id: commentID });
        res
          .status(200)
          .json({ message: `Comment ${commentID} deleted successfully` });
      }
    } catch (err) {
      // Handle any errors that occur during the deletion process
      res.status(500).json({ error: err.message });
    }
  }
  async update(req, res, next) {
    const { customerID } = req;
    const { commentID } = req.params;
    try {
      const comment = await Comment.findOne({ _id: commentID });
      if (!comment || customerID !== comment.customer.toString()) {
        return res
          .status(400)
          .json({ message: "Upadating comment was unsuccessful" });
      } else {
        await Comment.updateOne({ _id: commentID }, req.body, { new: true });
        res
          .status(200)
          .json({ message: `Comment ${commentID} updated successfully` });
      }
    } catch (err) {
      // Handle any errors that occur during the deletion process
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = new commentController();
