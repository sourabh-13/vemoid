const sql = require("../../../config/dbConnection")
exports.GetMerchantSendNotification = (req,result)=>{
    sql.query('SELECT * FROM tbl_notifications where user_id ='+ req.body.user_id, (err,res )=>{
        if(err){
            console.log("err")
            result(err, null)
            return
        }
        {
            result(null, res)
            return
        }
    })

}