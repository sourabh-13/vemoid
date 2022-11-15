const sendNotificationModel = require("../../../vemo-id-backend-merchant/models/notification/SendNotificationModel")
exports.sendmerchantnotification = (req,res)=>{
    sendNotificationModel.SendMerchantNotification(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err.message || "Error",
            })
        }
        else{
            res.status(200).send({
                success: "true",
                data: data,
                message: res.message || "Success"
            })
        }
    })
}