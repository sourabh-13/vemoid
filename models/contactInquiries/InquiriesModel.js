const sql = require('../../config/dbConnection');
exports.Inquiry = (result)=>{
    sql.query("SELECT id,name,message,subject, created_on FROM tbl_contact_inquiries ", function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    });
    
}