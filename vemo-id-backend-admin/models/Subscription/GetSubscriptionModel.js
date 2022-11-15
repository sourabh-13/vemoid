const sql = require('../../../config/dbConnection')

exports.getSubscriptionPlan = (result)=>{
    sql.query('SELECT *  FROM tbl_subscriptions WHERE status = 1',(err,res)=>{
        if(err){
            console.log('testing')
            result(err, null)
            return;
        }
        {
            result(null, res)
            return;
        }

    })
}