const DeleteMetaDataModel  = require('../../../vemo-id-backend-merchant/models/ManageApplication/DeleteMetaDataModel')

exports.deleteMetaData = (req,res)=>{
    DeleteMetaDataModel.DeleteMetaData(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else {
            res.status(200).send({
                success: 'true',
                message: res.message || 'Meta Data Deleted Successfully!',
                data:data
            })
        }
    })
}