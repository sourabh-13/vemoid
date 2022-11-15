const sql = require('../config/dbConnection');
exports.State = (req,result)=>{
    sql.query('SELECT * FROM states WHERE cid = "' + req.body.cid + '"', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}