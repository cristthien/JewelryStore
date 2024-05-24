const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

const port = 5000;

app.use("/assets", express.static("assets"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
