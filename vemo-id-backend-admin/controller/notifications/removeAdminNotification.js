const DeleteAdminNotificationsModel = require("../../../vemo-id-backend-admin/models/notifications/RemoveAdminNotificationModel");

exports.removeadminnotifications = (req,res) => {
  DeleteAdminNotificationsModel.DeleteAdminNotifications(req,(err, data) => {
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
