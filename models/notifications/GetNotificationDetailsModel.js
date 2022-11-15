const sql = require('../../config/dbConnection');
exports.GetNotificationsDetails = (req,result)=>{ 
    sql.query('SELECT * FROM tbl_notifications WHERE id='+ req.body.id, function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}