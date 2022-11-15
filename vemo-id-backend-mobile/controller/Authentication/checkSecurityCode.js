const authenticationWithPasscodeOtpModel = require('../../../vemo-id-backend-mobile/models/Authentication/AuthenticationWithPasscodeOtpModel')

exports.checkSecurityCode = (req,res)=>{
    if (!req.body.deviceToken && req.body.deviceToken==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Token'
            });
    }
    if (!req.body.code && req.body.code==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide security code'
            });
    }

    authenticationWithPasscodeOtpModel.checkSecurityCode(req,(err,data)=>{
        if(err){
            res.status(200).send({
                success: 'false',
                status:201,
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                status:200,
                message:data.message,
            })
        }
    })
}