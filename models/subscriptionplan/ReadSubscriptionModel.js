const sql = require('../../config/dbConnection');
exports.Readsubscription = (request,result)=>{ 
    sql.query('SELECT * FROM tbl_subscriptions WHERE id ='+request.body.id, function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}