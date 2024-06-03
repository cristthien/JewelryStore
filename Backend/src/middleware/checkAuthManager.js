const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel.js");
const { error } = require("../utilities/responeApj.js");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.staffID = decoded.staffID;
    Staff.findOne({ _id: decoded.staffID, role: "manager" })
      .exec()
      .then((staff) => {
        if (staff) {
          next();
        } else {
          throw new Error("Forbidden");
        }
      })
      .catch((e) => {
        res.status(500).json(error("Internal server error", 500));
      });
  } catch (e) {
    return res.status(403).json(error(e.message, 403));
  }
};
