const MerchantDeleteModel = require('../../../vemo-id-backend-admin/models/ManageMerchant/MerchantDeleteModel')

exports.merchantDataDelete = (req, res)=>{
    MerchantDeleteModel.DeleteMerchantData(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'Error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Deleted Data Successfully',
                data: data,
            })
        }
    })
}