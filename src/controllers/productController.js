class productController {
  // [GET] /news
  index(req, res) {
    res.json({ msg: "product Controllers" });
  }
}
module.exports = new productController();
