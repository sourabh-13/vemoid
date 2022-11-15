const sql = require("../../../config/dbConnection")

exports.GetAppuserData = (req,result)=>{
    sql.query('SELECT b.id, b.application_name, b.created_at, b.status, a.name FROM tbl_application_list b INNER JOIN tbl_users a ON b.user_id = a.id WHERE b.user_id = "'+req.body.user_id+'" AND a.user_type = "'+req.body.user_type+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }
        {
            console.log(res)
            result(null,res)
            return;
        }
    })
}