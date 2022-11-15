const sendActivationCodeModel = require('../../../vemo-id-backend-mobile/models/Authentication/SendActivationCodeModel')

exports.SendActivationCode = (req,res)=>{
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
    
    if(!req.body.country && req.body.country == null){
        return res.status(400).send({
            success: 'false',
            message: 'Please Provide Country'
        })
    }
    sendActivationCodeModel.sendActivationCode(req,(error,data)=>{
        if(error){
            res.status(500).send({
                success: false,
                message: error.message || 'Error!'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Success!',
                data: data
            })
        }

    })
}