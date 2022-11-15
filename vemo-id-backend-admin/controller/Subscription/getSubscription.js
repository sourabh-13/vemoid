const GetSubscriptionPlanModel = require('../../models/Subscription/GetSubscriptionModel')

exports.getsubscriptionplan = (req,res)=>{
    GetSubscriptionPlanModel.getSubscriptionPlan((err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }

        else {
            res.status(200).send({
                success: 'true',
                data:data,
            })
        }
    })
}