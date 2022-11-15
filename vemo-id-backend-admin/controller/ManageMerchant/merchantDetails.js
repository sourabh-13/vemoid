const MerchantDetailsModel = require("../../../vemo-id-backend-admin/models/ManageMerchant/MerchantDetailsModel");

exports.getmerchantdetails = (req,res)=>{
    MerchantDetailsModel.merchantsDetails(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                data: data
            })
        }
    })
} 