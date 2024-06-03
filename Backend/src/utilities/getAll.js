module.exports = (req, res, Model) => {
  Model.find({})
    .exec()
    .then((results) => {
      res.status(200).json({ length: results.length, results: results });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};
