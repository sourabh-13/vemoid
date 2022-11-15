const sql = require('../config/dbConnection');
exports.City = (req,result)=>{
    sql.query('SELECT * FROM city WHERE sid = "' + req.body.sid + '"', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}


//db.query('SELECT * FROM cities WHERE state_id = "' + req.body.state_id + '"',