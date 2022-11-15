const sql = require('../../config/dbConnection');

exports.Updatefaq = (request,result)=>{ 
   sql.query('UPDATE  tbl_faq SET questions ="'+request.body.questions+'", messages ="'+request.body.messages+'" WHERE id ="'+request.body.id+'"',(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
    
}