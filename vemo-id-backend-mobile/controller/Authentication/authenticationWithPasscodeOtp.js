const authenticationWithPasscodeOtpModel = require('../../../vemo-id-backend-mobile/models/Authentication/AuthenticationWithPasscodeOtpModel')

exports.authenticationWithPasscodeOTP = (req,res)=>{
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.transactionID && req.body.transactionID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction Id'
            });
    }
    if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    authenticationWithPasscodeOtpModel.authenticationWithPasscodeOtp(req,(err,data)=>{
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
                message:"App User Details",
                appUser: data.appUser,
                metaData:data.metaData
            })
        }
    })
}