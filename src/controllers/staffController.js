class staffController {
  // [GET] /news
  index(req, res) {
    res.json({ msg: "Staff Controllers" });
  }
}
module.exports = new staffController();
