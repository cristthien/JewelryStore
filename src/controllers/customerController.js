const Customer = require("../models/customerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class customerController {
  // [GET] /customeer   Only staff can  see it
  index(req, res) {
    res.status(200).json({ msg: " Customer Controller" });
  }

  //[POST] /customer/signup
  signup(req, res) {
    const email = req.body.email;
    Customer.findOne({ email: email })
      .exec()
      .then((result) => {
        if (!req.body.password || !email) {
          res.status(400).json({ msg: "Fullfil email and password" });
        } else if (!result) {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
              res.status(500).json({ msg: "internal sever error" });
            }
            const newCustomer = new Customer({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            newCustomer
              .save()
              .then((newCus) => res.status(200).json({ newCus }))
              .catch((e) => {
                res.status(401).json({ e });
              });
          });
        } else {
          res.status(409).json({ msg: "Email is used" });
        }
      })
      .catch((e) => res.status(400).json(e));
  }

  //[POST] /customer/login
  login(req, res) {
    Customer.findOne({ email: req.body.email })
      .exec()
      .then((customer) => {
        if (!customer) {
          res.status(400).json({ msg: "Email or password is not correct" });
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
                res.status(200).json({ token: token });
              } else {
                res
                  .status(400)
                  .json({ msg: "Email or password is not correct" });
              }
            });
        }
      })
      .catch((e) => res.status(400).json(e));
  }
  //[GET] / customer/:customerID
  getDetailInfo(req, res) {
    Customer.find({ _id: req.params.customerID })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((e) => res.status(400).json(e));
  }
  UpdateInfo(req, res) {
    Customer.findOneAndUpdate({ _id: req.params.customerID }, req.body, {
      new: true,
    })
      .then((result) => res.status(200).json(result))
      .catch((e) => {
        res.status(500).json(e);
      });
  }
}
module.exports = new customerController();
