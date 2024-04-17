const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/JewelryStore")
    .then(() => {
      console.log("connect successfull");
    })
    .catch((error) => handleError(error));
}

module.exports = connectDB;
