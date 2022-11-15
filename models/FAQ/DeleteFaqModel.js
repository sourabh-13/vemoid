const sql = require('../../config/dbConnection');

exports.Deletefaq = (request,result)=>{ 
   sql.query('DELETE FROM tbl_faq  WHERE id ="'+request.body.id+'"',(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
    
}