const setFaceAuthenticationModel = require('../../../vemo-id-backend-mobile/models/Authentication/SetAuthenticationFaceModel')

exports.FaceAuthentication = (req,res)=>{
    if (!req.body.type && req.body.type==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Auth type'
          });
    }
    if (!req.body.deviceUniqueNumber && req.body.deviceUniqueNumber==null) {
    return res.status(400).send({
        success:'false',
        message: 'Please Provide Device Unique Number'
        });
    }
    if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
    }
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }
    const authTypeArr = [1,2,3];
    if( authTypeArr.includes(req.body.type))
    {
        
    }
    else{
        return res.status(400).send({
            success:'false',
            message: 'Invalid Auth Type'
            });
    }



    setFaceAuthenticationModel.setAuthenticationWithFaceBiometric(req,(error,data)=>{
        if(error)
        {
            res.status(200).send({
                success: error.status,
                message: error.message || 'error'
            })
        }
        else
        {
            res.status(200).send({
                status: 200,
                //message: res.message || 'Data Collected Successfully!',
                record:data
            })
        }
    })
}