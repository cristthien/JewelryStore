const OrderItem = require("../models/orderItemModel");

module.exports = async function (orderID) {
  const orderItems = await OrderItem.find({ order: orderID }).populate(
    "product",
    "name image price"
  );

  if (!orderItems) {
    throw new Error("This order does not contain any products");
  } else {
    return {
      length: orderItems.length,
      products: orderItems,
    };
  }
};
