const jwt = require("jsonwebtoken");
const { error } = require("../utilities/responeApj.js");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userID = decoded.userID;
    if (req.userID == req.params.customerID) {
      next();
    } else {
      throw new Error("Auth Fail");
    }
  } catch (e) {
    return res.status(401).json(error(e.message, 401));
  }
};
