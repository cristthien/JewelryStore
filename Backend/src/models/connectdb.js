const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://cristhuuthien:thien123@cluster0.vre9cbj.mongodb.net/dbStore?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connection successful");
    })
    .catch((error) => {
      console.error("Connection error:", error);
    });
}

module.exports = connectDB;
