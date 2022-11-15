const getmerchantApplicationlistModel = require('../../models/ManageMerchants/GetMerchantApplicationModel')

exports.getmerchantapplist = (req,res)=>{
    getmerchantApplicationlistModel.getApplicationlist(req,(err,data)=>{
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