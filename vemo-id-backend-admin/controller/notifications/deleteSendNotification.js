const DeleteSendNotificationsModel = require("../../../vemo-id-backend-admin/models/notifications/DeleteSendNotificationModel");

exports.deletesendnotifications = (req,res) => {
  DeleteSendNotificationsModel.DeleteSendNotifications(req,(err, data) => {
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
