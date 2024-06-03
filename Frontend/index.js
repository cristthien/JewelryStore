const express = require("express");
const { engine } = require("express-handlebars");
const route = require("./routes/index.js");
const dotenv = require("dotenv");
const checkServer = require("./utilities/checkServer.js");
const getCategories = require("./utilities/getCategories.js");
const helpers = require("./utilities/helpers.js");
const cors = require("cors");
const app = express();

const passport = require("passport");
const session = require("express-session");
require("./utilities/auth.js");
app.use(cors());

const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// for passport
app.use(
  session({ secret: "SECRET_KEY", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();
app.use("/assets", express.static("assets"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: helpers,
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(checkServer);
app.use(getCategories);

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
