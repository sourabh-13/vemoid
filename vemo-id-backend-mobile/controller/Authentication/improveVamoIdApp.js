const improveVamoIdAppModel = require('../../../vemo-id-backend-mobile/models/Authentication/improveVamoIdAppModel')

exports.ImproveVamoIdApp = (req,res)=>{
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
            });
    }

    improveVamoIdAppModel.improveVamoIdApp(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: 'Thank you for your feedback'
            })
        }
    })
}