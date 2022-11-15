const updateAppStatusModel = require("../../../vemo-id-backend-merchant/models/ManageApplication/UpdateAppStatusModel")

exports.UpdateAppStatus = (req,res)=>{
    updateAppStatusModel.updateAppStatus(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Status Updated Successfully',
                data: data
            })
        }
    })
}