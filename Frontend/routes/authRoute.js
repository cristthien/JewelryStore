const express = require("express");
const authRoute = express.Router();
const passport = require("passport");

// Routes
authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/failure",
  })
);

authRoute.get("/protected", isLoggedIn, (req, res) => {
  var scripts = [{ script: "../../assets/js/account/setLocalStorage.js" }];
  if (req.user.error) {
    res.redirect("/login");
  } else {
    res.render("loading", { scripts: scripts, user: req.user.results });
  }
});

authRoute.get("/failure", (req, res) => {
  res.send("Authentication Failed");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}
module.exports = authRoute;
