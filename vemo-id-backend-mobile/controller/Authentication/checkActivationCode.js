const checkActivationCodeAuthenticationModel = require('../../../vemo-id-backend-mobile/models/Authentication/CheckActivationCodeModel')

exports.checkActivation = (req,res)=>{

if (req.body.activationCode == "" && req.body.activationCode==null) {
    return res.status(400).send({
        success:'false',
        message: 'Please Provide Activation Code'
        });
}
if (req.body.idNumber == "" && req.body.idNumber==null) {
    return res.status(400).send({
        success:'false',
        message: 'Please Provide ID Number'
        });
}
if (req.body.deviceToken == "" && req.body.deviceToken==null) {
    return res.status(400).send({
        success:'false',
        message: 'Please Provide Device Token'
        });
}
    checkActivationCodeAuthenticationModel.checkActivationCodeAuthentication(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                status:err.status,
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                status:200,
                message: res.message || 'success',
                record:data
            })
        }
    })
}