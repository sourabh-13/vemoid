const sql = require('../../config/dbConnection');
exports.Getcontactdetails = (result)=>{ 
    sql.query('SELECT * FROM tbl_contact_details', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}