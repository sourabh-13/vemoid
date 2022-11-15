const sql = require("../../../config/dbConnection")
exports.DeleteAdminNotifications = (request,result)=>{ 
    
    sql.query('DELETE  FROM tbl_user_notification WHERE id = "'+request.body.id+'"', (err,res )=>{
        if(err){
            console.log('testing')
            result(err, null)
            return;
        }
        
    

    result(null,res)
    return;
    })
    
     
 }
