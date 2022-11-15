const sql = require('../../config/dbConnection')

exports.GetMerchantApp = (req,result)=>{
    sql.query('SELECT b.id,b.status,b.application_name, b.created_at, a.name FROM tbl_application_list b  INNER JOIN tbl_users a ON a.id = b.user_id  WHERE a.id = "'+req.body.id+'"', (err,res)=>{
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