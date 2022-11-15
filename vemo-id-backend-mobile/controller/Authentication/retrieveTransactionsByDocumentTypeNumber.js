const retrieveTransactionsByDocumentTypeNumberModel = require("../../../vemo-id-backend-mobile/models/Authentication/RetrieveTransactionsByDocumentTypeNumberModel")

exports.retrieveTransactionsByDocumentTypeNumber = (req,res)=>{
    if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application ID'
            });
    }
    if (!req.body.country&& req.body.country==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Country'
            });
    }
    if (!req.body.documentType&& req.body.documentType==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Document Type'
            });
    }
    if (!req.body.documentNumber&& req.body.documentNumber==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide document Number'
            });
    }
    retrieveTransactionsByDocumentTypeNumberModel.RetrieveTransactionsByDocumentTypeNumber(req,(err,data)=>{
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