const authenticationWithPasscodeOtpModel = require('../../../vemo-id-backend-mobile/models/Authentication/AuthenticationWithPasscodeOtpModel')
const metadata = require('../../Globalmetadata');
//var request = require('request');
//const { curly } = require('node-libcurl')

exports.checkSecurityCodeChangeOtp = (req,res)=>{
    if (!req.body.deviceToken && req.body.deviceToken==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Token'
            });
    }
    if (!req.body.otp && req.body.otp==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide otp'
            });
    }

    authenticationWithPasscodeOtpModel.checkSecurityCodeChangeOtp(req,(err,data)=>{
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
exports.createSecurityCode = (req,res) =>{
    if (req.body.deviceToken=="" && req.body.deviceToken==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Token'
            });
    }
    if (req.body.code=="" && req.body.code==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide security code'
            });
    }

    authenticationWithPasscodeOtpModel.createSecurityCode(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                // status:201,
                message: err.message
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

exports.myHistory = (req,res) =>{

    if (!req.body.deviceToken && req.body.deviceToken==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Token'
            });
    }
    authenticationWithPasscodeOtpModel.myHistory(req,(err,data)=>{
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
                record:data.record,
            })
        }
    })

}

exports.aboutUs = (req,res) =>
{
    const aboutus = {
                    'content':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    }
    res.status(200).send({
        status:200,
        record:aboutus,
    });
}
exports.appRejectAuthenticationWithPasscode = (req,res) =>
{
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.transactionID && req.body.transactionID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction Id'
            });
    }
    if (!req.body.deviceName && req.body.deviceName==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Name'
            });
    }
    if(metadata.checkExpiredAuthentication(req.body.transactionID)===0)
    {
        return res.status(400).send({
            success:'false',
            message: 'Expired Request'
            });
    }
    authenticationWithPasscodeOtpModel.appRejectAuthenticationWithPasscode(req,(err,data)=>{
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

exports.updateDeviceToken = (req,res) =>{
    if (!req.body.email && req.body.email==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Email Address'
            });
    }
    if (!req.body.deviceToken && req.body.deviceToken==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Token'
            });
    }
    authenticationWithPasscodeOtpModel.updateDeviceToken(req,(err,data)=>{
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


   // var url = 'https://mobileandwebsitedevelopment.com/fivepercent/webhooksTest.php/';

    // var data = {
    // "jsonrpc":"2.0",
    // "id":"3"
    // };

    // request.post({url:url, formData: data}, function(err, httpResponse, body) {
    // if (err) {
    //     return console.error('post failed:', err);
    // }

    // console.log('Post successful!  Server responded with:');
    // });

    
    // const { data } = curly.post('https://mobileandwebsitedevelopment.com/fivepercent/webhooksTest.php/', {
    // postFields: JSON.stringify({ field: 'value' }),
    // httpHeader: [
    //     'Content-Type: application/json',
    //     'Accept: application/json'
    // ],
    // })

    // console.log(data)


}

exports.authenticateLoginAppUserByLoginType = (req,res) =>{
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
    if (!req.body.loginType && req.body.loginType==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Login Type'
            });
    }
    if (!req.body.deviceName && req.body.deviceName==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Name'
            });
    }
    authenticationWithPasscodeOtpModel.authenticateLoginAppUserByLoginType(req,(err,data)=>{
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
exports.loginAppUserWithQrCode = (req,res) =>
{
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.loginType && req.body.loginType==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Login Type'
            });
    }
    if (!req.body.deviceName && req.body.deviceName==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Device Name'
            });
    }
    authenticationWithPasscodeOtpModel.loginAppUserWithQrCode(req,(err,data)=>{
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

// for web authentication
exports.getMetaDataWebAuth = (req,res) =>
{
    if (!req.body.userid && req.body.userid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id ddd'
            });
    }
    if (!req.body.appid && req.body.appid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.transaction && req.body.transaction==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction ID'
            });
    }

    authenticationWithPasscodeOtpModel.getMetaDataWebAuth(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}

exports.getApplicationDetailstaWebAuth = (req,res) =>
{

    if (!req.body.appid && req.body.appid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    authenticationWithPasscodeOtpModel.getApplicationDetailstaWebAuth(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}

exports.validateNewRegisteredUserWebAuth = (req,res) =>
{
    if (!req.body.passcode && req.body.passcode==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Pass Code'
            });
    }
    if (!req.body.userid && req.body.userid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.appid && req.body.appid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.transaction && req.body.transaction==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction ID'
            });
    }

    authenticationWithPasscodeOtpModel.validateNewRegisteredUserWebAuth(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}
exports.rejectAuthenticationWebAuth = (req,res) =>
{
    // if (!req.body.passcode && req.body.passcode==null) {
    //     return res.status(400).send({
    //         success:'false',
    //         message: 'Please Provide Pass Code'
    //         });
    // }
    if (!req.body.userid && req.body.userid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.appid && req.body.appid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.transaction && req.body.transaction==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction ID'
            });
    }

    authenticationWithPasscodeOtpModel.rejectAuthenticationWebAuth(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}

exports.updateValidateRegisteredUserWebAuth = (req,res) =>
{

    // for (const key in req) {
    //     // console.log(key+":", req[key]);
    //     console.log(key+"__");
    // }
    console.log(req.body.browser);
    console.log("----------------")
    //console.log(req.rawHeaders);
    
    // if (!req.body.passcode && req.body.passcode==null) {
    //     return res.status(400).send({
    //         success:'false',
    //         message: 'Please Provide Pass Code'
    //         });
    // }
    if (!req.body.userid && req.body.userid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.appid && req.body.appid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.transaction && req.body.transaction==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction ID'
            });
    }

    authenticationWithPasscodeOtpModel.updateValidateRegisteredUserWebAuth(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}
// -->
exports.updateStateExpirationTrans = (req, res) => 
{
    console.log("expired")
    if (!req.body.transaction && req.body.transaction==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction ID'
            });
    }

    authenticationWithPasscodeOtpModel.updateStateExpiredTrans(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}

exports.resendAuthenticationOtpWebAuth = (req,res) =>
{
    if (!req.body.userid && req.body.userid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    if (!req.body.appid && req.body.appid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.transaction && req.body.transaction==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction ID'
            });
    }

    authenticationWithPasscodeOtpModel.resendAuthenticationOtpWebAuth(req,(err,data)=>{
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
                data:data,
            })
        }
    })
}