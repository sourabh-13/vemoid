const GetAppuserDataModel = require("../../../vemo-id-backend-merchant/models/ManageApplication/GetAppDataModel")

exports.getappuserdata = (req,res)=>{
    GetAppuserDataModel.GetAppuserData(req,(err,data)=>{
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