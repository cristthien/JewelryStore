const collectionRoute = require("./collectionRoute.js");
const searchRounte = require("./searchRoute.js");
const authRoute = require("./authRoute.js");
const profileRoute = require("./profileRoute.js");
const productRoute = require("./productRoute.js");
const cartRoute = require("./cartRoute.js");
const adminRoute = require("./adminRoute.js");

function routes(app) {
  app.use("/cart", cartRoute);
  app.use("/products", productRoute);
  app.use("/admin", adminRoute);
  app.use("/collections", collectionRoute);
  app.use("/search", searchRounte);
  app.use("/auth", authRoute);
  app.use("/profile", profileRoute);
  app.use("/map", (req, res) => {
    res.render("map");
  });
  app.use("/forgot-password", (req, res) => {
    const scripts = [
      { script: "../../assets/js/account/forgotPassword.js" },
      { script: "../../assets/js/account/checkValid.js" },
      { script: "../../assets/js/account/forgotPasswordHandler.js" },
    ];
    res.render("forgotPassword", { scripts });
  });
  app.use("/reset-password", (req, res) => {
    const scripts = [
      { script: "../../assets/js/account/resetPassword.js" },
      { script: "../../assets/js/account/checkValid.js" },
      { script: "../../assets/js/account/resetPasswordHandler.js" },
    ];
    res.render("resetPassword", { scripts });
  });
  app.use("/signup", (req, res, next) => {
    var scripts = [
      { script: "../../assets/libraries/axios.min.js" },
      { script: "../../assets/js/account/checkValid.js" },
      { script: "../../assets/js/account/signup.js" },
    ];
    res.render("signup", { scripts });
  });
  app.use("/login", (req, res, next) => {
    var scripts = [
      { script: "../../assets/libraries/axios.min.js" },
      { script: "../../assets/js/account/checkValid.js" },
      { script: "../../assets/js/account/login.js" },
    ];
    res.render("login", { scripts });
  });

  app.use("/news", (req, res, next) => {
    var scripts = [{ script: "../../assets/js/news/newsHandler.js" }];
    res.render("news", { scripts: scripts });
  });
  app.use("/stories", (req, res, next) => {
    res.render("stories");
  });

  app.get("/", (req, res) => {
    res.render("home");
  });
}
module.exports = routes;
