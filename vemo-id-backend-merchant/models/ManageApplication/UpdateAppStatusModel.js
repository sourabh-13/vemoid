const sql = require('../../../config/dbConnection')

exports.updateAppStatus = (req, result)=>{
    sql.query('UPDATE tbl_application_list SET status = "'+req.body.status+'" WHERE id = "'+req.body.id+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }
        else{
            result(null,res)
            return;
        }
    })
}