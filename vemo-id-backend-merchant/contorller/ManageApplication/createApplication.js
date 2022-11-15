const CreateApplicationModel = require("../../../vemo-id-backend-merchant/models/ManageApplication/CreateApplicationModel")

exports.createApplication = (req,res)=>{
    if(req.body.application_name > 0){
        res.status(400).send({
            success: 'false',
            message: 'Please choose Other Name'
        })
    }
    CreateApplicationModel.CreateApplication(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
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