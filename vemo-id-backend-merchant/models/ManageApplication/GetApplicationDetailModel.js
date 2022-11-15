const sql = require("../../../config/dbConnection")

exports.GetApplicationDetail = (req,result)=>{
    sql.query('SELECT * FROM tbl_application_list WHERE id = "'+req.body.id+'"', (err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }
        {
            result(null,res)
            return;
        }
    })
}