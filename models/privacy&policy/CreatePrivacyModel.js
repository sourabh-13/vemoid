const sql = require("../../config/dbConnection");
exports.Privacy=(request,result)=>{
  
  sql.query('SELECT COUNT(id) AS totalCount FROM tbl_privacy_policy',(err,resq)=>{
    if (err) {
     
      result(err, null);
      return;
    }
     if(resq[0].totalCount>0)
     {
      sql.query(`UPDATE tbl_privacy_policy SET heading='${request.body.heading}' ,  descriptions ='${request.body.descriptions}' WHERE id = 14 `,(err,res)=>{
       
        if (err) {
          
          result(err, null);
          return;
        }
          result(null,res);
          return;
      });

   
     }
     else
     {
      sql.query(`INSERT INTO tbl_privacy_policy  (heading,descriptions)
      VALUE ('${request.body.heading}','${request.body.descriptions}');`,(err,res)=>{
        if (err) {
          console.log("testing3")
          result(err, null);
          return;
        }
          result(null,res);
          return;
      });
     }
   
    
  });

    
  }