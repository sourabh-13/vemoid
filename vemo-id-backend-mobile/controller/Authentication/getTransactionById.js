const GetTransactionByIdModel = require('../../../vemo-id-backend-mobile/models/Authentication/GetTransactionByIDModel')

exports.retrieveTransactionsByTransactionID = (req,res)=>{
    if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application ID'
            });
    }
    if (!req.body.transactionID && req.body.transactionID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide TransactionID'
            });
    }
    GetTransactionByIdModel.getTransactionById(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        
            res.status(200).send({
                success: 'true',
                data: data,
            })
    
    })
}