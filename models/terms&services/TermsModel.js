const sql = require("../../config/dbConnection");
exports.Terms=(request,result)=>{
  //  console.log(request.body.heading);
  //  console.log(request.body.descriptions);

  sql.query('SELECT COUNT(id) AS totalCount FROM tbl_terms_services',(err,resq)=>{
    if (err) {
      //console.log("testing1")
      result(err, null);
      return;
    }
     if(resq[0].totalCount>0)
     {
      sql.query(`UPDATE tbl_terms_services SET heading='${request.body.heading}' ,  descriptions ='${request.body.descriptions}' WHERE id=27 `,(err,res)=>{
        //console.log(err)
        if (err) {
          //console.log("testing2")
          result(err, null);
          return;
        }
          result(null,res);
          return;
      });

     // console.log(testing.sql); 
     }
     else
     {
      sql.query(`INSERT INTO tbl_terms_services  (heading,descriptions)
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
   
    // result(null,resq);
    // return;
  });

    
  }