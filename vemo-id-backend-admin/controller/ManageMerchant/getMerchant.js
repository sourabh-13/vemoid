const getMerchantModel = require("../../../vemo-id-backend-admin/models/ManageMerchant/GetMerchantDataModel")

exports.getmerchantdata = (req,res)=>{
    getMerchantModel.GetMerchantData(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Collecting Data',
                data: data,
            })
        }
    })
}