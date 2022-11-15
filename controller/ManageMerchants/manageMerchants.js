const ManageMerchantsModel = require("../../models/ManageMerchants/ManageMerchantsModel");

exports.manageMerchantsList = (req, res) => {
  ManageMerchantsModel.ManageMerchants(req,(err, data) => {
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
