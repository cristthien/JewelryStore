const validator = require("validator");
const { error } = require("../utilities/responeApj.js");

function hasSpace(password) {
  return /\s/.test(password);
}
function hasDiacriticPattern(password) {
  const diacriticPattern = /[^\u0000-\u007F]/u;
  return diacriticPattern.test(password);
}

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json(error("Fullfil email and password", 400));
  } else if (!validator.isEmail(email)) {
    res.status(400).json(error("Please enter the correct email", 400));
  } else if (hasDiacriticPattern(password) || hasSpace(password)) {
    res
      .status(400)
      .json(
        error(
          "Please enter passord that doesnot contain space or diacritic characters",
          400
        )
      );
  } else if (!validator.isStrongPassword(password)) {
    res.status(400).json(error("Please enter strong password", 400));
  } else {
    next();
  }
};
