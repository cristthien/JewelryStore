class orderController {
  // [GET] /news
  index(req, res) {
    res.json({ msg: "order Controllers" });
  }
}
module.exports = new orderController();
