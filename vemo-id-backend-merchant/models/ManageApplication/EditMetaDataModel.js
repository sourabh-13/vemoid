const sql = require('../../../config/dbConnection')

exports.editMetaData = (req,result)=>{
    sql.query('UPDATE tbl_meta_data SET meta_key = "'+req.body.meta_key+'", metaLabel = "'+req.body.metaLabel+'", es_MetaLabel="'+req.body.es_MetaLabel+'", meta_key_type= "'+req.body.meta_key_type+'", orders="'+req.body.orders+'", visibility="'+req.body.visibility+'" WHERE  id = "'+req.body.id+'"',(err,res)=>{
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