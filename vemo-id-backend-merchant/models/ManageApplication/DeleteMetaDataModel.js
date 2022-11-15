const sql = require('../../../config/dbConnection')

exports.DeleteMetaData = (req,result)=>{
    sql.query('UPDATE tbl_meta_data SET deleteStatus = 1 WHERE id = "'+req.body.id+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }
        {
            result(null, res)
            return;
        }
    })
}