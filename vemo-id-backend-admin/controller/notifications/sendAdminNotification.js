const sendAdminNotificationModel = require("../../../vemo-id-backend-admin/models/notifications/SendAdminNotificationModel");

exports.sendadminnotification = (req,res)=>{
    sendAdminNotificationModel.sendAdminNotification(req,(err, data) => {
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
