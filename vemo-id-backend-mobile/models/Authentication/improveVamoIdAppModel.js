const sql = require('../../../config/dbConnection')

exports.improveVamoIdApp = (request,result)=>{
    const appUserID = request.body.appUserID
    sql.query('SELECT appUserId FROM tbl_improve_vamo_id_app WHERE appUserId = "'+appUserID+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }

        if(res.length ===0)
        {
            
            sql.query(`INSERT INTO tbl_improve_vamo_id_app(appUserId ) VALUE('${appUserID}');`,(error,resp)=>{
                if(error){
                    console.log('testing2')
                    result(error,null)
                    return;
                }
            })
            
        }
        
    
    });
    const message = {
        message:"Thank you for your feedback"
    }
    result(null, message)
    return;

       
    

}