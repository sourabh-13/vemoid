const SendNotificationModel = require("../../models/notifications/SendNotificatonModel");
exports.sendnotifications=(req,res)=>{
 

    SendNotificationModel.SendNotification(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message:
            err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        data:data
      });
    });
};