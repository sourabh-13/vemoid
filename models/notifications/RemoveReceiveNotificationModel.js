const sql = require('../../config/dbConnection');

exports.DeleteReceivenotifications = (request,result)=>{ 
   sql.query('DELETE FROM tbl_receive_notifications  WHERE id ="'+request.body.id+'"',(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
    
}