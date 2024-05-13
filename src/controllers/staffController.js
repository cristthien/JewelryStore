const Staff = require("../models/staffModel.js");
const Customer = require("../models/customerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const getAll = require("../utilities/getAll.js");
const { error, success } = require("../utilities/responeApj.js");

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
                    expiresIn: "2 days",
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
}
module.exports = new staffController();
