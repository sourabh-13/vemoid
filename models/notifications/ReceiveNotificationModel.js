const sql = require('../../config/dbConnection');
exports.ReceiveNotifications = (result)=>{ 
    sql.query('SELECT * FROM tbl_receive_notifications', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}