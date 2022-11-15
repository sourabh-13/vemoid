const sql = require("../../../config/dbConnection")
exports.GetMerchantNotificaton = (request,result)=>{
   
    sql.query('SELECT a.*,b.subject,b.message FROM tbl_user_notification a INNER JOIN tbl_notifications b ON a.notifiction_id=b.id WHERE a.user_id="'+request.body.user_id+'"', (err,res )=>{
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