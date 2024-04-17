// Import library, framework
const express = require("express");
const app = express();
// Import function from other components
const routes = require("./routes/index.js");
const connectDB = require("./models/connectdb.js");

//
const port = 3000;

// Route
routes(app);
// Connectdb
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
