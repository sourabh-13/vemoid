const getCallbackUrl = require('../../../vemo-id-backend-mobile/models/Authentication/GetCallbackFromAppAfterQrCodeScanModel')

exports.GetCallbackUrlAfterQrCodeScan = (req,res)=>{
    if(string=="" && string==null)
    {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide String'
          });
    }
}