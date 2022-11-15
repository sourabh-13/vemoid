const sql = require('../../config/dbConnection');
exports.GetSubscriptions = (result)=>{ 
    sql.query('SELECT * FROM tbl_subscriptions', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}