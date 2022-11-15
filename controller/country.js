const CountryModel = require("../models/CountryModel");

exports.countriesList = (req, res) => {
  CountryModel.Country((err, data) => {
    if (err)
      res.status(500).send({
        success: "false",
        message: err.message || "error",
      });
    else
      res.status(200).send({
        success: "true",
        data: data,
      });
  });
};
