const TransactionDataModel = require('../../../vemo-id-backend-merchant/models/ManageApplication/GetTransactionDataModel')

exports.getTransactionList = (req,res)=>{
    TransactionDataModel.getTransaction(req,(err,data)=>{
        if (err)
      res.status(500).send({
        success: "false",
        message: err.message || "error",
      });
    else
      res.status(200).send({
        success: "true",
        data: data,
      });
    })
}