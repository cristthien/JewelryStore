const axios = require("axios");
module.exports = (req, res, next) => {
  axios
    .get(process.env.SERVER)
    .then((response) => {
      next(); // Server is reachable, proceed
    })
    .catch((error) => {
      res.render("500", { layout: false });
    });
};
