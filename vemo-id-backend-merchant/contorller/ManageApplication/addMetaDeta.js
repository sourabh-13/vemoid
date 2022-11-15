const AddMetaDataModel = require('../../../vemo-id-backend-merchant/models/ManageApplication/AddMetaDataModel')

exports.addmetadata = (req,res)=>{
    // if(!req.body.meta_key && req.body.meta_key == null){
    //     res.status(401).send({
    //         success: 'false',
    //         message: 'Please Enter Meta Key!'
    //     })
    // }
    AddMetaDataModel.AddMetaData(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'true',
                message: err.message || 'error'
            })
        }

        else{
            res.status(200).send({
                success: 'true',
                message: res.message ||'Meta Data Created Successfully!',
                data: data
            })
        }
    })
}