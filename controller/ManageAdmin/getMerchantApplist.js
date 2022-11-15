const getMerchantApplication = require('../../models/ManageAdmin/GetMerchantApplistModel')

exports.getMerchantapp = (req,res)=>{
    getMerchantApplication.GetMerchantApp(req,(err,data)=>{
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