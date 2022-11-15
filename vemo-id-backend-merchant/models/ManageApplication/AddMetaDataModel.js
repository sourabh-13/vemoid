const sql = require('../../../config/dbConnection')

exports.AddMetaData = (request,result)=>{

        if(request.body.id==0)
        {
          sql.query(`INSERT INTO tbl_meta_data  (id,applicationID,meta_key,metaLabel,es_MetaLabel,meta_key_type,orders,visibility)
          VALUE ('${request.body.id}','${request.body.applicationID}','${request.body.meta_key}', '${request.body.metaLabel}', '${request.body.es_MetaLabel}', '${request.body.meta_key_type}','${request.body.orders}','${request.body.visibility}');`,(err,res)=>{
            if (err) {
              console.log("testing3")
              result(err, null);
              return;
            }
            result(null,res);
            return;
              
          });
        }
        else{
          sql.query('UPDATE tbl_meta_data SET meta_key = "'+request.body.meta_key+'", metaLabel = "'+request.body.metaLabel+'", es_MetaLabel="'+request.body.es_MetaLabel+'", meta_key_type= "'+request.body.meta_key_type+'", orders="'+request.body.orders+'", visibility="'+request.body.visibility+'" WHERE  id = "'+request.body.id+'"',(error,resp)=>{
            if(error){
                console.log('testing')
                result(err,null)
                return;
            }

    
            {
                result(null,resp)
                return;
            }
        })

       

        }
          
        
}
       
        
    
    
