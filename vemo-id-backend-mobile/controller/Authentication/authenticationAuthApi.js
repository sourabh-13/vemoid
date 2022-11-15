const authenticationAuthApiModel = require('../../../vemo-id-backend-mobile/models/Authentication/AuthenticationAuthApiModel')

exports.authenticationAuthApi = (req,res)=>{
    if (!req.body.email && req.body.email==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Email'
            });
    }
    if (!req.body.name && req.body.name==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Name'
            });
    }
    if (!req.body.applicationid && req.body.applicationid==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
            });
        }
    
    if(!req.body.phone && req.body.phone== null){
        return res.status(400).send({
            success: 'false',
            message: 'Please Provide PhoneNumber'
        })
    }
    authenticationAuthApiModel.AuthenticationAuthApi(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'Error!'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                data: data,
            })
        }
    })
}