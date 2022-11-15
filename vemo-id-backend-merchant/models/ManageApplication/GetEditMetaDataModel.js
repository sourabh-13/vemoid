const sql = require('../../../config/dbConnection')

exports.getEditMetaData = (request,result)=>{
    sql.query('SELECT * FROM tbl_meta_data WHERE id = "'+request.body.id+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;

        }
        result(null,res)
        return;
    })

}