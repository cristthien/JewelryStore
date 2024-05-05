// Import library, framework
const express = require("express");
const app = express();
const dotenv = require("dotenv");
var methodOverride = require("method-override");
// Import function from other components
const routes = require("./routes/index.js");
const connectDB = require("./models/connectdb.js");
const handleError = require("./utilities/handleError.js");
const port = 3000;
//Middleware for parsing parameter in post method
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
//Config static
app.use(express.static("public"));
// Override method
app.use(methodOverride("_method"));

// dotenv config global
dotenv.config();
// Route
routes(app);
// Connectdb
connectDB();
app.use(handleError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
