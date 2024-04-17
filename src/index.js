// Import library, framework
const express = require("express");
const app = express();
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
// Import function from other components
const routes = require("./routes/index.js");
const connectDB = require("./models/connectdb.js");

//
const port = 3000;
//Middleware for parsing parameter in post method
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
// dotenv config global
dotenv.config();
// Route
routes(app);
// Connectdb
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
