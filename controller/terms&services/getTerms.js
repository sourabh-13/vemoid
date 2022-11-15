const GetTermsModel = require("../../models/terms&services/GetTermsModel");

exports.getterms = (req,res) => {
  GetTermsModel.GetTerms((err, data) => {
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
