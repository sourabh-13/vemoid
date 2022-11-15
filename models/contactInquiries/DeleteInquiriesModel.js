const sql = require('../../config/dbConnection');

exports.Deleteinquiries = (request,result)=>{ 
   sql.query('DELETE FROM tbl_contact_inquiries  WHERE id ="'+request.body.id+'"',(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
    
}