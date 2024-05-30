const { success } = require("./responeApj.js");
module.exports = (req, res, next) => {
  res.status(200).json(success("Server is running on", 200, {}));
};
