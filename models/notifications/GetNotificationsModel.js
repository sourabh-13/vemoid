const sql = require('../../config/dbConnection');
exports.GetNotifications = (req,result)=>{ 
    sql.query('SELECT * FROM tbl_notifications WHERE user_id='+ req.body.user_id, function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}