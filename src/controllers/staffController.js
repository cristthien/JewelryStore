const Staff = require("../models/staffModel.js");
const Customer = require("../models/customerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const getAll = require("../utilities/getAll.js");
class staffController {
  // [GET] /staff
  index(req, res) {
    getAll(req, res, Staff);
  }
  //[POST] /staff/signup
  signup(req, res) {
    const email = req.body.email;
    Staff.findOne({ email: email })
      .exec()
      .then((result) => {
        if (!req.body.password || !email) {
          res.status(400).json({ msg: "Fullfil email and password" });
        } else if (!result) {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
              res.status(500).json({ msg: "internal sever error" });
            }
            const newStaff = new Staff({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            newStaff
              .save()
              .then((newstaff) => res.status(200).json({ newstaff }))
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

  //[POST] /staff/login
  login(req, res) {
    Staff.findOne({ email: req.body.email })
      .exec()
      .then((staff) => {
        if (!staff) {
          res.status(400).json({ msg: "Email or password is not correct" });
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
