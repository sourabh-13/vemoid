const updateMerchantModel = require("../../models/ManageMerchants/EditMerchantModel");

exports.editmerchantdata = (req,res)=>{
    updateMerchantModel.EditMerchants(req,(err,data)=>{
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