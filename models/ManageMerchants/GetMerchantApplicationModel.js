const sql = require('../../config/dbConnection')

exports.getApplicationlist = (req,result)=>{
    sql.query('SELECT b.id, b.application_name, b.created_at, a.name,(SELECT COUNT(id) FROM tbl_app_users c WHERE c.applicationID=b.id) AS appUser FROM tbl_application_list b  INNER JOIN tbl_users a ON a.id = b.user_id  WHERE a.id = "'+req.body.id+'" AND user_type="'+req.body.user_type+'"',(err,res)=>{
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