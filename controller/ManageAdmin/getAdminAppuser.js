const GetAppUserModel = require('../../models/ManageAdmin/GetAdminAppUserModel')

exports.getAppuser = (req,res)=>{
    GetAppUserModel.getAdminAppuser(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
            
        }
        else{
            res.status(200).send({
                success: 'true',
                data:data,
            })
        }
    })
}