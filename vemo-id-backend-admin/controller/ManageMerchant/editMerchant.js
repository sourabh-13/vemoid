const EditMerchantModel = require("../../../vemo-id-backend-admin/models/ManageMerchant/EditMerchantModel")

exports.editmerchantdata = (req, res)=>{
    EditMerchantModel.EditMerchant(req, (err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Update data successfully',
                data: data
            })
        }
    })
}