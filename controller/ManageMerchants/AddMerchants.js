const AddMerchantModel = require('../../models/ManageMerchants/AddMerchantsModel')

exports.addMerchant = (req,res)=>{
    AddMerchantModel.AddMerchants(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error',
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