const e = require('express')
const updateUserProfileImage = require('../../../vemo-id-backend-mobile/models/Authentication/UpdateUserProfileModel')

exports.updateProfie = (req,res)=>{
    if(req.body.appUserID == "" && req.body.appUserID == null){
       return res.status(400).send({
        success: 'false',
        message: 'Please Provide App User Id'
       })

    }
    updateUserProfileImage.UpdateUserProfile(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success:'false',
                message: err.message || 'error'
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