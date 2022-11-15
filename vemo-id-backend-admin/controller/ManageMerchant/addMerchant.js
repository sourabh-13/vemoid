const AddMerchantModel = require("../../../vemo-id-backend-admin/models/ManageMerchant/AddMerchantModel")

exports.addAdminMerchant = (req,res)=>{
    AddMerchantModel.AddMerchants(req,(err,data)=>{
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