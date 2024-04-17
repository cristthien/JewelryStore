class staffController {
  // [GET] /staff
  index(req, res) {
    res.json({ msg: "Staff Controllers" });
  }
  //[POST] /customer/signup
  signup(req, res) {
    const email = req.body.email;
    Customer.findOne({ email: email })
      .exec()
      .then((result) => {
        if (!req.body.password || !email) {
          res.status(400).json({ msg: "Fullfil email and password" });
        } else if (!result) {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
              res.status(500).json({ msg: "internal sever error" });
            }
            const newCustomer = new Customer({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            newCustomer
              .save()
              .then((newCus) => res.status(200).json({ newCus }))
              .catch((e) => {
                res.status(401).json({ e });
              });
          });
        } else {
          res.status(409).json({ msg: "Email is used" });
        }
      })
      .catch((e) => res.status(400).json(e));
  }

  //[POST] /customer/login
  login(req, res) {
    Customer.findOne({ email: req.body.email })
      .exec()
      .then((customer) => {
        if (!customer) {
          res.status(400).json({ msg: "Email or password is not correct" });
        } else {
          bcrypt
            .compare(req.body.password, customer.password)
            .then(function (result) {
              if (result) {
                res.status(200).json({ msg: "tra vef jwt" });
              } else {
                res
                  .status(400)
                  .json({ msg: "Email or password is not correct" });
              }
            });
        }
      })
      .catch((e) => res.status(400).json(e));
  }
}
module.exports = new staffController();
