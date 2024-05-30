const Customer = require("../models/customerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { error, success } = require("../utilities/responeApj.js");
const mailer = require("../utilities/mailer.js");
require("dotenv").config();
class customerController {
  //[POST] /customer/signup
  signup(req, res, next) {
    const email = req.body.email;
    Customer.findOne({ email: email })
      .exec()
      .then((result) => {
        if (!req.body.password || !email) {
          res.status(200).json(error("Fullfil email and password", 400));
        } else if (!result) {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
              res
                .status(200)
                .json(error("Have trouble in hasing password", 500));
            }
            mailer.sendVerifyEmail(email, "Verify Email", hash);

            const newCustomer = new Customer({
              name: req.body.name,
              email: req.body.email,
              password: hash,
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
          res.status(200).json(error("Email is used by others", 409));
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
          res.status(200).json(error("Email or password is not correct", 401));
        } else {
          if (customer.methodLogin == "google") {
            res.status(200).json(error("You login throgh google", 401));
          } else if (!customer.verify) {
            res.status(200).json(error("Verify email first", 401));
          } else {
            bcrypt
              .compare(req.body.password, customer.password)
              .then(function (result) {
                if (result) {
                  const token = jwt.sign(
                    { userID: customer._id },
                    process.env.JWT_SECRET_KEY,
                    {
                      expiresIn: "30 days",
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
                    .status(200)
                    .json(error("Email or password is not correct", 400));
                }
              });
          }
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

  async loginWithGoogle(req, res, next) {
    const { email, name } = req.body;
    const existedUser = await Customer.findOne({
      email: email,
      methodLogin: "google",
    });
    if (!existedUser) {
      const newCustomer = new Customer({
        name: name,
        email: email,
        methodLogin: "google",
      });
      try {
        await newCustomer.save();

        const token = jwt.sign(
          { userID: newCustomer._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "30 days",
          }
        );
        res.status(200).json(
          success(
            "Login successfully",
            {
              name: newCustomer.name,
              token: token,
            },
            200
          )
        );
      } catch (e) {
        res.status(200).json(error("Internal saving user", 500));
      }
    } else {
      const token = jwt.sign(
        { userID: existedUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30 days",
        }
      );
      res.status(200).json(
        success(
          "Login successfully",
          {
            name: existedUser.name,
            token: token,
          },
          200
        )
      );
    }
  }
  async verify(req, res, next) {
    try {
      const { email, token } = req.query;
      const user = await Customer.findOneAndUpdate(
        { email, password: token, verify: false }, // Find user with matching email and token (stored in password field)
        { $set: { verify: true } }, // Update the verify field to true
        { new: true } // Return the updated document
      );

      if (!user) {
        return res
          .status(200)
          .json(error("User not found or invalid token or verified", 404));
      }
      res.redirect(`${process.env.APP_CLIENT}/login`);
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  }
  async reset(req, res, next) {
    try {
      const { email, token, newPassword } = req.body;

      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        if (err) {
          res.status(200).json(error("Have trouble in hasing password", 500));
        }
        const user = await Customer.findOneAndUpdate(
          { email, password: token },
          { $set: { password: hash } },
          { new: true }
        );
        if (!user) {
          return res.status(200).json(error("email or token not found", 404));
        }
        res.redirect(`${process.env.APP_CLIENT}/login`);
      });
    } catch (e) {
      next(e);
    }
  }
  async change(req, res, next) {
    const { customerID } = req;
    const { oldPassword, newPassword } = req.body;
    Customer.findOne({ _id: customerID })
      .then((customer) => {
        bcrypt.compare(oldPassword, customer.password).then(function (result) {
          console.log(result);
          if (result) {
            bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
              if (err) {
                res
                  .status(200)
                  .json(error("Have trouble in hasing password", 500));
              }
              customer.password = hash;
              await customer.save();
              res.redirect(`${process.env.APP_CLIENT}/login`);
            });
          } else {
            res.status(200).json(error("Old password is not correct", 400));
          }
        });
      })
      .catch((err) => {
        res.status(200).json(error(err.message, 500));
      });
  }
  async registerResetPassword(req, res, next) {
    const { email } = req.body;
    try {
      const customer = await Customer.findOne({ email });
      if (!customer) {
        res.status(200).json(error("Customer not exists"), 400);
      } else if (customer.methodLogin == "google") {
        res.status(200).json(error("Login through Google"), 400);
      } else {
        mailer.sendResetPasswordEmail(
          email,
          "Reset Password",
          customer.password
        );
        res
          .status(200)
          .json(success("You can open your make to active new password"), 200);
      }
    } catch (e) {
      res.status(200).json(error(e.message), 401);
    }
  }
}
module.exports = new customerController();
