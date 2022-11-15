const GetNotificationModel = require("../../models/notifications/GetNotificationDetailsModel");

exports.getnotificationdetails = (req,res) => {
  GetNotificationModel.GetNotificationsDetails(req,(err, data) => {
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
