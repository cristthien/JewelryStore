const Staff = require("../models/staffModel.js");
const Customer = require("../models/customerModel.js");
const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
const SizeProduct = require("../models/sizeModel.js");
const OrderItem = require("../models/orderItemModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const getAll = require("../utilities/getAll.js");
const { error, success } = require("../utilities/responeApj.js");
const {
  MultipleMongooseObject,
  SingleMongooseObject,
} = require("../utilities/Mongoose.js");

class staffController {
  // [GET] /staff
  index(req, res) {
    getAll(req, res, Staff);
  }
  //[POST] /staff/signup
  signup(req, res, next) {
    const email = req.body.email;
    Staff.findOne({ email: email })
      .exec()
      .then((result) => {
        if (!req.body.password || !email) {
          res.status(400).json(error("Fullfil email and password", 400));
        } else if (!result) {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
              res
                .status(500)
                .json(error("Have trouble in hasing password", 500));
            }
            const newStaff = new Staff({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            newStaff
              .save()
              .then((newstaff) =>
                res
                  .status(200)
                  .json(
                    success(
                      "New staff is signed up successfully",
                      newstaff,
                      200
                    )
                  )
              )
              .catch((e) => {
                next(e);
              });
          });
        } else {
          res.status(409).json(error("Email is used by others", 409));
        }
      })
      .catch((e) => next(e));
  }

  //[POST] /staff/login
  login(req, res) {
    Staff.findOne({ email: req.body.email })
      .exec()
      .then((staff) => {
        if (!staff) {
          res.status(400).json(error("Email or password is not correct", 400));
        } else {
          bcrypt
            .compare(req.body.password, staff.password)
            .then(function (result) {
              if (result) {
                const token = jwt.sign(
                  { staffID: staff._id },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: "30 days",
                  }
                );
                res.status(200).json(
                  success(
                    "Login successfully",
                    {
                      name: staff.name,
                      token: token,
                    },
                    200
                  )
                );
              } else {
                res
                  .status(400)
                  .json(error("Email or password is not correct", 400));
              }
            });
        }
      })
      .catch((e) => next(e));
  }
  getDetailStaff(req, res) {
    Staff.findOne({ _id: req.params.staffID })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  getAllCustomer(req, res) {
    getAll(req, res, Customer);
  }
  UpdateInfo(req, res) {
    Staff.findOneAndUpdate({ _id: req.params.staffID }, req.body, {
      new: true,
    })
      .then((result) => res.status(200).json(result))
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  async getOrderDetail(req, res, next) {
    const { id } = req.params;
    try {
      const order = await Order.findOne({ _id: id }).populate(
        "customer",
        "email"
      );
      const orderItems = await OrderItem.find({ order: id }).populate(
        "product",
        "name price"
      );
      const orderObject = order.toObject();
      const response = {
        items: orderItems,
        ...orderObject,
      };
      if (!order) {
        res.status(200).json(error("Order not found", 404));
      } else {
        res
          .status(200)
          .json(success("Fetching order successfully", response, 200));
      }
    } catch (e) {
      next(e);
    }
  }
  async getAllOrders(req, res, next) {
    const { staffID } = req;
    try {
      let orders = await Order.find({}).populate("customer", "_id name ");
      orders = orders.reverse();
      const total = orders.reduce(
        (acc, item) => acc + item.total,
        0 // Initial accumulator value
      );
      const response = {
        length: orders.length,
        total: total,
        orders,
      };
      res
        .status(200)
        .json(success("Fetching order successfully", response, 200));
    } catch (e) {
      next(e);
    }
  }
  async getDetailCustomer(req, res, next) {
    const { id } = req.params;
    try {
      const customer = await Customer.findOne({ _id: id });
      let orders = await Order.find({ customer: id });
      if (orders.length == 0) {
        return res
          .status(200)
          .json(
            success(
              "Fetching customer is successfully",
              { customer: customer },
              200
            )
          );
      }
      orders = MultipleMongooseObject(orders);
      const resultOrders = await Promise.all(
        orders.map(async (order) => {
          const items = await OrderItem.find({ order: order._id }).populate(
            "product",
            "name slug price"
          );
          return {
            ...order,
            items,
          };
        })
      );

      res
        .status(200)
        .json(
          success(
            "Fetching customer is successfully",
            { customer: customer, orders: resultOrders },
            200
          )
        );
    } catch (e) {
      next(e);
    }
  }
  getDetailProduct(req, res, next) {
    Product.findOne({ _id: req.params.id })
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
}

module.exports = new staffController();
