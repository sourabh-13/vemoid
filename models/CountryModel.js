const sql = require('../config/dbConnection');
exports.Country = (result)=>{
    sql.query('SELECT * FROM countries ORDER BY id asc', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}