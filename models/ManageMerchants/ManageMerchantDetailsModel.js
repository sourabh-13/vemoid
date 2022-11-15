const sql = require('../../config/dbConnection')

exports.MerchantsDetails = (req, result)=>{
    sql.query('SELECT a.id,a.name,a.email,a.phone_number,a.created_at,a.company_name,a.country,a.registartion_number,a.address,a.password,(select count(user_id) from tbl_application_list where user_id=a.id)as appcount FROM tbl_users a WHERE a.user_type=2 AND id = "'+req.body.id+'"', (err,res)=>{
        if(err){
            console.log('error')
            result(err,null);
            return;
        }


        console.log(res)
        result(null,res)
        return;
    })
}