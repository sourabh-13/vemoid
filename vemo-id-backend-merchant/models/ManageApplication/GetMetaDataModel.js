const sql = require('../../../config/dbConnection')

exports.GetMetadata = (req,result)=>{

    sql.query('SELECT id,applicationID,meta_key,metaLabel, es_MetaLabel,meta_key_type,orders,visibility,meta_value,created_at FROM tbl_meta_data WHERE applicationID = "'+req.body.id+'" AND deleteStatus = 0 ORDER BY orders',(err,res)=>{
        if(err){
            console.log('testing')
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

