const sql = require('../../config/dbConnection');
exports.GetPrivacy = (result)=>{ 
    sql.query('SELECT * FROM tbl_privacy_policy', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}