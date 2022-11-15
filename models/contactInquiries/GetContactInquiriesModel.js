const sql = require('../../config/dbConnection');
exports.GetInquiry = (req,result)=>{
    sql.query('SELECT * FROM tbl_contact_inquiries WHERE id = '+ req.body.id, function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}