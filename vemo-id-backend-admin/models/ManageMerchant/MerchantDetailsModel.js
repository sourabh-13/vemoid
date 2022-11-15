const sql = require("../../../config/dbConnection")

exports.merchantsDetails = (req,result)=>{
    sql.query('SELECT a.id,a.name,a.email,a.phone_number,a.created_at,a.address, a.password, a.country, a.registartion_number,a.company_name,(select count(user_id) from tbl_application_list where user_id=a.id)as appcount FROM tbl_users a WHERE id = "'+req.body.id+'" AND user_type = "'+req.body.user_type+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }
        {
            result(null, res)
            return;
        }
    })
}