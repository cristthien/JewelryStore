const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel.js");
const { error } = require("../utilities/responeApj.js");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.customerID = decoded.userID;

    Customer.findOne({ _id: decoded.userID })
      .then((customer) => {
        if (!customer) {
          throw new Error("Auth Fail");
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(200).json(error(err.message, 500));
      });
  } catch (e) {
    return res.status(200).json(error(e.message, 401));
  }
};
