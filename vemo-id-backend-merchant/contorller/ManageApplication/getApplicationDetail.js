const GetApplicationDetailModel = require('../../../vemo-id-backend-merchant/models/ManageApplication/GetApplicationDetailModel')

exports.getApplicationDetail = (req,res)=>{
    GetApplicationDetailModel.GetApplicationDetail(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                data: data,
            })
        }
    })
}