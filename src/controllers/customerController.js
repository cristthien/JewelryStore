const Customer = require("../models/customerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { error, success } = require("../utilities/responeApj.js");

class customerController {
  //[POST] /customer/signup
  signup(req, res, next) {
    const email = req.body.email;
    Customer.findOne({ email: email })
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
            const newCustomer = new Customer({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            newCustomer
              .save()
              .then((newCus) =>
                res
                  .status(200)
                  .json(
                    success(
                      "New customer is signed up successfully",
                      newCus,
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

  //[POST] /customer/login
  login(req, res, next) {
    Customer.findOne({ email: req.body.email })
      .exec()
      .then((customer) => {
        if (!customer) {
          res.status(400).json(error("Email or password is not correct", 400));
        } else {
          bcrypt
            .compare(req.body.password, customer.password)
            .then(function (result) {
              if (result) {
                const token = jwt.sign(
                  { userID: customer._id },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: "2 days",
                  }
                );
                res.status(200).json(
                  success(
                    "Login successfully",
                    {
                      name: customer.name,
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
  //[GET] / customer/:customerID
  getDetailInfo(req, res, next) {
    Customer.find({ _id: req.params.customerID })
      .exec()
      .then((customer) => {
        res.status(200).json(
          success("Getting information is successfully", {
            name: customer.name,
          })
        );
      })
      .catch((e) => next(e));
  }
  UpdateInfo(req, res, next) {
    Customer.findOneAndUpdate({ _id: req.params.customerID }, req.body, {
      new: true,
    })
      .then((customer) =>
        res
          .status(200)
          .json(
            success(
              "Updating information is success",
              { name: customer.name, email: customer.email },
              200
            )
          )
      )
      .catch((e) => {
        next(e);
      });
  }
}
module.exports = new customerController();
