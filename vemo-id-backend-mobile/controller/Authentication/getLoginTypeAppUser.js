const getLoginTypeUserModel = require('../../../vemo-id-backend-mobile/models/Authentication/GetLoginTypeAppUserModel')

exports.GetLoginTypeUser = (req,res)=>{

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

    getLoginTypeUserModel.getLoginTypeAppUser(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                status:200,
                success: 'true',
                message: res.message || 'success',
                record:data
            })
        }
    })
}