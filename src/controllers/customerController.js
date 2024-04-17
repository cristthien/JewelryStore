const Customer = require("../models/customerModel.js");
class customerController {
  // [GET] /news
  index(req, res) {
    const newCustomer = new Customer({
      name: "cristthien",
      email: "cristhuuthien@gmail.com",
      password: "giathien",
    });
    newCustomer
      .save()
      .then((newCus) => res.status(200).json({ newCus }))
      .catch((e) => {
        res.status(401).json(e);
      });
  }
}
module.exports = new customerController();
