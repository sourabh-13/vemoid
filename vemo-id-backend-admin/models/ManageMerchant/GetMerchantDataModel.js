const sql = require("../../../config/dbConnection")

exports.GetMerchantData = (req,result)=>{
    sql.query('SELECT a.id,a.updateStatus,a.company_image,a.name,a.email,a.phone_number,a.created_at,(select count(user_id) from tbl_application_list where user_id=a.id)as appcount FROM tbl_users a WHERE a.parentID="'+req.body.user_id+'" AND user_type="'+req.body.user_type+'"',(err,res)=>{
        if(err){
            //console.log('error')
            result(err,null)
            return;
        }

        {
            //console.log(res)
            result(null,res)
            return;
        }
    })
}