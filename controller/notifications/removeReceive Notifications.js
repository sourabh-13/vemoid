const DeleteReceiveNotificationsModel = require("../../models/notifications/RemoveReceiveNotificationModel");

exports.removereceivenotifications = (req,res) => {
  DeleteReceiveNotificationsModel.DeleteReceivenotifications(req,(err, data) => {
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
