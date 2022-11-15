const GetMerchantDataModel = require("../../models/ManageAdmin/GetMerchantsDataModel")

exports.getMerchantsData = (req,res)=>{
    GetMerchantDataModel.GetMerchantData(req,(err,data)=>{
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