const customerRoute = require("./customerRoute.js");
const orderRoute = require("./orderRoute.js");
const productRoute = require("./productRoute.js");
const staffRoute = require("./staffRoute.js");
const collectionRoute = require("./collectionRoute.js");
const cartRoute = require("./cartRoute.js");
const commnetRoute = require("./commentRoute.js");

//test function
const lockingFunctions = require("../utilities/lockingFunctions.js");
const mongoose = require("mongoose");
const Customer = require("../models/customerModel.js");
const commentRoute = require("./commentRoute.js");

// end test

function routes(app) {
  app.use("/cart", cartRoute);
  app.use("/collection", collectionRoute);
  app.use("/customer", customerRoute);
  app.use("/order", orderRoute);
  app.use("/product", productRoute);
  app.use("/comment", commentRoute);
  app.get("/getcustomer", (req, res, next) => {
    Customer.find()
      .then((results) => res.status(200).json({ customers: results }))
      .catch((err) => {
        next(err);
      });
  });
  app.use("/staff", staffRoute);

  app.use("/test", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Insert a new user
      await Customer.create(
        [
          {
            email: "cristhuuthien@gmail.com",
            password: "gia thien",
            name: " Gia thien dep trai",
          },
        ],
        { session }
      );
      await session.abortTransaction();

      // Commit the transaction
      console.log(" Asorb Transaction committed successfully!");
    } catch (error) {
      // Abort the transaction if an error occurs
      await session.abortTransaction();
      console.error("Transaction aborted. Error:", error);
    } finally {
      session.endSession();
    }
  });
}

//   app.get("/test", async (req, res) => {
//     const stocks = [
//       { _id: "6622ba95b55d34bb4a9d4adb", stock: 37 },
//       { _id: "66252715aa4198455f97b6b1", stock: 16 },
//       { _id: "66252715aa4198455f97b6b2", stock: 16 },
//     ];
//     try {
//       let updateStocks = await lockingFunctions.acquireLocks(stocks, null);
//       await lockingFunctions.releaseLocks(stocks, null);
//       res.status(200).json(updateStocks);
//     } catch (err) {
//       res.status(400).json(err.message);
//     }
//   });

//   app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });
// }
module.exports = routes;
