const sql = require('../../config/dbConnection');
exports.Readfaq = (result)=>{ 
    sql.query('SELECT * FROM tbl_faq ', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}