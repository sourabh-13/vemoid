const RetrieveTransactionByMetaDataModel = require('../../../vemo-id-backend-mobile/models/Authentication/RetrieveTransactionsByMetadataModel')

exports.retrieveTransactionByMetaData = (req,res)=>{
    RetrieveTransactionByMetaDataModel.RetrieveTransactionByMetaData(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                data: data
            })
        }

})
}