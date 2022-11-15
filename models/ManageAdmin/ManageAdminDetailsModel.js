const sql = require("../../config/dbConnection");
exports.ManageAdminDetails=(req,result)=>{
    sql.query('SELECT a.id,a.name,a.email,a.phone_number,a.created_at,a.company_name,a.country,a.registartion_number,a.address,a.password,(select count(user_id) from tbl_application_list where user_id=a.id)as appcount FROM tbl_users a WHERE a.user_type=1 AND id = "'+req.body.id+'"',function(err,data){
        if(err){
            console.log("data can't get");
            result(err, null);
            return;
        }
        result(null,data);
        console.log(data);
        return;
    })
}


 