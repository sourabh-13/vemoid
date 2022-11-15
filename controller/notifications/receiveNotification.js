const ReceiveNotificationModel = require("../../models/notifications/ReceiveNotificationModel");

exports.receivenotification = (req,res) => {
  ReceiveNotificationModel.ReceiveNotifications((err, data) => {
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
