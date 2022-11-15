const EditMetaDataModel = require('../../../vemo-id-backend-merchant/models/ManageApplication/EditMetaDataModel')

exports.editMetaData = (req,res)=>{
    EditMetaDataModel.editMetaData(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{

            res.status(200).send({
                success: 'true',
                message: res.message || 'Meta Data Updated Successfully!',
                data:data,
            })
        }
    })
}