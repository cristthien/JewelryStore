const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel.js");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.staffID = decoded.staffID;
    if (req.staffID == req.params.staffID) {
      next();
    } else {
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
          res.status(400).json(e);
        });
    }
  } catch (e) {
    return res.status(403).json(e.message);
  }
};
