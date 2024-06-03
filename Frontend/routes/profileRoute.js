const express = require("express");
const profileRoute = express.Router();

profileRoute.get("/password", (req, res) => {
  let scripts = [{ script: "../../assets/js/profile/password.js " }];
  res.render("password", { scripts });
});
profileRoute.get("/email", (req, res, next) => {
  let scripts = [{ script: "../../assets/js/profile/email.js " }];
  res.render("email", { scripts });
});
profileRoute.get("/orders", (req, res, next) => {
  let scripts = [{ script: "../../assets/js/profile/order.js " }];
  res.render("order", { scripts: scripts });
});
profileRoute.get("/address", (req, res, next) => {
  const scripts = [
    { script: "../../assets/js/profile/menuLocation.js" },
    { script: "../../assets/js/profile/address.js" },
    { script: "../../assets/js/profile/addressHandler.js" },
  ];
  res.render("address", { scripts: scripts });
});

profileRoute.get("/", function (req, res, next) {
  var scripts = [
    { script: "../../assets/libraries/axios.min.js" },
    { script: "../../assets/js/user/profileHandler.js" },
    { script: "../../assets/js/user/myProfile.js" },
  ];
  res.render("myProfile", { scripts });
});
module.exports = profileRoute;
