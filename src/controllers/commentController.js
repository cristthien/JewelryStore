const Comment = require("../models/commentModel.js");
const OrderItem = require("../models/orderItemModel.js");
const Order = require("../models/orderModel.js");
const { error, success } = require("../utilities/responeApj.js");

class commentController {
  // [GET] /news
  async index(req, res, next) {
    // View theo productslug
    const { product } = req;
    try {
      const comments = await Comment.find({ product: product._id });
      res.status(200).json(
        success(
          "Getting product comments successfully",
          {
            length: comments.length,
            comments: comments,
          },
          200
        )
      );
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
      res
        .status(400)
        .json(
          error(
            "Comment for this product already exsits. You can modify it",
            400
          )
        );
    } else {
      const order = await Order.findOne({ _id: orderID });
      if (!order || order.customer != customerID) {
        console.log(order);
        res
          .status(400)
          .json(error("You are not be customer who create this order", 400));
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
            .then((result) =>
              res
                .status(200)
                .json(success("Creating comment successfully", result, 200))
            )
            .catch((err) => next(err));
        } else {
          res
            .status(400)
            .json(error(`${product.name} does not exist in ${orderID}`, 400));
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
          .json(error("Deleting comment was unsuccessful", 400));
      } else {
        await Comment.deleteOne({ _id: commentID });
        res
          .status(200)
          .json(success(`Comment ${commentID} deleted successfully`, {}, 200));
      }
    } catch (err) {
      next(err);
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
          .json(error("Upadating comment was unsuccessful", 400));
      } else {
        const updatedComment = await Comment.updateOne(
          { _id: commentID },
          req.body,
          { new: true }
        );
        res
          .status(200)
          .json(
            success(
              `Comment ${commentID} updated successfully`,
              updatedComment,
              200
            )
          );
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new commentController();
