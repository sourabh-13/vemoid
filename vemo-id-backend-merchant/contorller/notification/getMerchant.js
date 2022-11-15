const GetMerchnatDataModel = require("../../../vemo-id-backend-merchant/models/notification/GetMerchantModel");

exports.getmerchantdata = (req, res) => {
    GetMerchnatDataModel.GetMerchantNotificaton(req,(err, data) => {
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
