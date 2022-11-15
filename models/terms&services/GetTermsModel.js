const sql = require('../../config/dbConnection');
exports.GetTerms = (result)=>{ 
    sql.query('SELECT * FROM tbl_terms_services', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}