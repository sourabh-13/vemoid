const updateAppUserModel = require("../../../vemo-id-backend-merchant/models/ManageApplication/UpdateAppUserModel")

exports.updateAppuser = (req,res)=>{
    updateAppUserModel.UpdateAppUser(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Status Updated Successfully!',
                data:data
            })
        }
    })
}