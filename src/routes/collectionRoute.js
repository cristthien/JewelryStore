const express = require("express");
const collectionRoute = express.Router();
const collectionController = require("../controllers/collectionController.js");
const checkAuthAdmin = require("../middleware/checkAuthAdmin.js");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/collection/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
collectionRoute.post("/", upload.single("thumb"), collectionController.create);
collectionRoute.put(
  "/:slug",
  upload.single("thumb"),
  collectionController.update
);
collectionRoute.get("/search", collectionController.search);
collectionRoute.delete("/:slug", collectionController.delete);
collectionRoute.get("/:slug", collectionController.getDetailCollection);

collectionRoute.get("/", collectionController.index);

module.exports = collectionRoute;
