const recordDetailsModel = require('../../../vemo-id-backend-mobile/models/Authentication/RecordDetailsModel')

exports.recordDetails = (req,res)=>{
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App User Id'
          });
      }
      if (!req.body.applicationID && req.body.applicationID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Application Id'
          });
      }
      if (!req.body.transactionId && req.body.transactionId==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide Transaction Id'
          });
      }
    
    recordDetailsModel.getRecordDetails(req,(error,data)=>{
        if(error)
        {
            res.status(500).send({
                success: 'false',
                message: error.message || 'error'
            })
        }
        else
        {
            res.status(200).send({
                status: 200,
                //message: res.message || 'Data Collected Successfully!',
                record:data
            })
        }
    })
}