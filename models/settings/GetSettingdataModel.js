const sql = require('../../config/dbConnection');
exports.Getsettingdata = (request,result)=>{ 
    
    sql.query('SELECT a.*,b.name AS countryName FROM tbl_users a LEFT JOIN countries b ON a.country=b.id WHERE a.id = "'+request.body.id+'"', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}