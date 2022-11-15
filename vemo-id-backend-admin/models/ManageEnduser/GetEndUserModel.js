const sql = require("../../../config/dbConnection")

exports.GetEnduser = (req,result)=>{
    sql.query('SELECT a.name, a.email, a.phone, b.application_name FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.ownerID = "'+req.body.ownerID+'"', (err,res)=>{
        if(err){
            console.log('Testing')
            result(err, null)
            return;
        }
        {
            console.log(res)
            result(null, res)
            return;
        }
    })
}