const ManageMerchantDetailsModel = require('../../models/ManageMerchants/ManageMerchantDetailsModel')

exports.manageMerchantDetails = (req, res)=>{
    ManageMerchantDetailsModel.MerchantsDetails(req,(err,data) => {
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