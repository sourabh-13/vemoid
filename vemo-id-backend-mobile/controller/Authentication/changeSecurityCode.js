const ChangeSecurityCodeModel = require('../../../vemo-id-backend-mobile/models/Authentication/ChangeSecurityCodeModel')

exports.changeSecurityCode = (req,res)=>{
    if (!req.body.deviceToken && req.body.deviceToken==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide deviceToken'
            });
    }
    if (!req.body.oldcode && req.body.oldcode==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide old security code'
            });
    }
    if (!req.body.newcode && req.body.newcode==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide new security code'
            });
    }
    ChangeSecurityCodeModel.ChangeSecurityCode(req,(err,data)=>{
        if(err){
            res.status(200).send({
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