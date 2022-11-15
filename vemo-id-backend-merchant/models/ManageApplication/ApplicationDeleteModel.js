const sql = require('../../../config/dbConnection')

exports.ApplicationDelete = (req,result)=>{
    sql.query('DELETE  FROM tbl_application_list2 WHERE id = "'+req.body.id+'"', (err,res)=>{
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