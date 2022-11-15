const sql = require("../../../config/dbConnection");

exports.GetAdmindata = (request,result)=>{
    
    sql.query('SELECT a.user_id AS USERID,a.id AS notificationID,b.* FROM `tbl_user_notification` a INNER JOIN tbl_notifications b ON a.notifiction_id =b.id WHERE a.user_id= '+ request.body.user_id, (err,res )=>{
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