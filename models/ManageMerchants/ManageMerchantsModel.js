const sql = require("../../config/dbConnection");
exports.ManageMerchants=(req,result)=>{
    sql.query('SELECT a.id,a.updateStatus,a.name,a.company_image,a.email,a.phone_number,a.created_at,(select count(user_id) from tbl_application_list where user_id=a.id)as appcount FROM tbl_users a WHERE a.user_type="'+req.body.user_type+'" AND parentID = "'+req.body.user_id+'" AND deleteStatus = 0',function(err,data){
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



