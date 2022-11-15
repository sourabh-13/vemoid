const GetAppuserlistModel = require('../../../vemo-id-backend-merchant/models/ManageApplication/GetAppusersModel')

exports.getAppUserList = (req,res)=>{
    GetAppuserlistModel.getAppuserlist(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }

        else
            res.status(200).send({
                success: 'true',
                message: res.message || 'Data Collected Successfully',
                data:data,
            })
        
    })
}