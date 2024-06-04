const Customer = require("../models/customerModel.js");
const Order = require("../models/orderModel.js");
const SizeProduct = require("../models/sizeModel.js");
const OrderItem = require("../models/orderItemModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { MultipleMongooseObject } = require("../utilities/Mongoose.js");
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
    Customer.findOne({ email: req.body.email, methodLogin: undefined })
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
    const { customerID } = req;

    Customer.findById(customerID)
      .exec()
      .then((customer) => {
        if (!customer) {
          return res.status(290).json(error("Customer not found", 404));
        }

        // Remove the password field
        const customerObj = customer.toObject();
        delete customerObj.password;

        // Format the dob field if it exists
        if (customerObj.dob) {
          const dob = new Date(customerObj.dob);
          customerObj.dob = dob.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        }

        res
          .status(200)
          .json(success("Getting information successfully", customerObj));
      })
      .catch((e) => next(e));
  }

  UpdateInfo(req, res, next) {
    console.log("usser");
    const { customerID } = req;
    try {
      const { day, month, year } = req.body;
      if (day && month && year) {
        // Create a new Date object for the date of birth
        const dob = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
        // Validate the date object
        if (isNaN(dob)) {
          return res.status(200).json(error("Invalid date of birth provided"));
        }

        // If valid, set dob in the request body
        req.body.dob = dob;
      }

      Customer.findOneAndUpdate({ _id: customerID }, req.body, {
        new: true,
      })
        .then((customer) => {
          if (!customer) {
            return res.status(200).json(error("Customer not found", 404));
          }

          res.status(200).json(
            success("Updating information is successful", {
              name: customer.name,
              email: customer.email,
            })
          );
        })
        .catch((e) => next(e));
    } catch (e) {
      next(e);
    }
  }

  async loginWithGoogle(req, res, next) {
    const { email, name } = req.body;

    try {
      // Check if the user already exists
      let user = await Customer.findOne({
        email: email,
      });

      if (!user) {
        // If user does not exist, create a new user
        user = new Customer({ name, email, methodLogin: "google" });
        await user.save();
      }
      if (!user.methodLogin) {
        return res.status(200).json(error("You need to login", 401));
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30 days",
      });

      // Respond with success message and user details
      res.status(200).json(
        success(
          "Login successfully",
          {
            name: user.name,
            token: token,
          },
          200
        )
      );
    } catch (error) {
      // Handle any errors that occur during the process
      next(error);
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
    try {
      const { customerID } = req;
      const { oldPassword, newPassword } = req.body;

      // Validate input parameters
      if (!oldPassword || !newPassword) {
        return res
          .status(200)
          .json(error("Both old and new passwords are required", 400));
      }

      // Find the customer by ID
      const customer = await Customer.findById(customerID);

      // If customer not found
      if (!customer) {
        return res.status(200).json(error("Customer not found", 404));
      }

      // Compare old password with the stored password
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        customer.password
      );

      if (!passwordMatch) {
        return res.status(200).json(error("Old password is incorrect", 400));
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update customer's password
      customer.password = hashedPassword;
      await customer.save();

      // Password successfully changed
      return res
        .status(200)
        .json(success("Password changed successfully", {}, 200));
    } catch (error) {
      // Handle errors
      console.error("Error changing password:", error);
      return res.status(200).json(error("Internal server error", 500));
    }
  }
  async getOrders(req, res, next) {
    const { customerID } = req;
    try {
      let orders = await Order.find({ customer: customerID });
      if (orders.length == 0) {
        return res
          .status(200)
          .json(success("Fetching customer is successfully", orders, 200));
      }
      orders = MultipleMongooseObject(orders);
      orders.reverse();
      const resultOrders = await Promise.all(
        orders.map(async (order) => {
          const items = await OrderItem.find({ order: order._id }).populate(
            "product",
            "name slug price image"
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
            { orders: resultOrders },
            200
          )
        );
    } catch (e) {
      next(e);
    }
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
          .json(
            success("You can open your make to active new password", {}, 200)
          );
      }
    } catch (e) {
      res.status(200).json(error(e.message), 401);
    }
  }

  async changeEmailNotify(req, res, next) {
    const { customerID } = req;
    const { email } = req.body;
    try {
      const customer = await Customer.findOne({ _id: customerID });
      if (!customer) {
        res.status(200).json(error("Customer is not found", 404));
      } else {
        console.log(email, customer);
        mailer.sendVerifyChangeEmail(
          email,
          "Verify Change Email",
          customer.password
        );
        res
          .status(200)
          .json(
            success("Please check new email to verify before login", {}, 200)
          );
      }
    } catch (e) {
      res.status(200).json(error("Internal server error", 500));
    }
  }
  async verifyEmail(req, res, next) {
    const { email, token } = req.query;
    try {
      const customer = await Customer.findOneAndUpdate(
        { password: token },
        { email: email }
      );
      if (!customer) {
        res.status(200).json(error("Customer not found", 404));
      } else {
        res.redirect(`${process.env.APP_CLIENT}/login`);
      }
    } catch (e) {
      res.status(200).json("Internal server error", 500);
    }
  }
}
module.exports = new customerController();
