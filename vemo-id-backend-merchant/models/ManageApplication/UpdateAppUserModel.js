const sql = require("../../../config/dbConnection")

exports.UpdateAppUser = (req,result)=>{
    sql.query('UPDATE tbl_app_users SET status = "'+req.body.status+'" WHERE id = "'+req.body.id+'"',(error,res)=>{
        if(error){
            console.log('Testing')
            result(error,null)
            return;
        }
        else{
            result(null,res)
            return;
        }
    })
}