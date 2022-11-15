const CreateSubscriptionsModel = require("../../models/subscriptionplan/CreateSubscriptionModel");
exports.createsubscription=(req,res)=>{
 
    CreateSubscriptionsModel.Createsubscriptions(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message:
            err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        data:data
      });
    });
};