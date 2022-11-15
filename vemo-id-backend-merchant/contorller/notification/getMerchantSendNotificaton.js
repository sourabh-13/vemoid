const GetSendMerchantModel = require("../../../vemo-id-backend-merchant/models/notification/GetMerchantSendNotificationModel")
exports.getmerchantsendnotification = (req,res)=>{
    GetSendMerchantModel.GetMerchantSendNotification(req,(err, data) => {
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
}