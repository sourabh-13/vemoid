const sql = require("../../config/dbConnection")

exports.GetMerchantData = (req,result)=>{

    sql.query('SELECT * FROM tbl_users WHERE ParentID = "'+req.body.id+'" AND user_type = "'+req.body.user_type+'"', (err,res)=>{
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