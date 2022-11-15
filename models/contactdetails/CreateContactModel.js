const sql = require("../../config/dbConnection");
exports.Createcontact=(request,result)=>{

    // sql.query(`INSERT INTO tbl_contact_details  (Phone_number, email, address)
    // VALUES ('${request.body.Phone_number}','${request.body.email}', '${request.body.address}');`,(err,res)=>{
    //   if (err) {
    //     console.log("testing")
    //     result(err, null);
    //     return;
    //   }
    //     result(null,res);
    //     return;
    // });

    sql.query('SELECT COUNT(id) AS totalCount FROM tbl_contact_details',(err,resq)=>{
      if (err) {
        //console.log("testing1")
        result(err, null);
        return;
      }
       if(resq[0].totalCount>0)
       {
        sql.query(`UPDATE tbl_contact_details SET Phone_number='${request.body.Phone_number}' ,  email ='${request.body.email}', address ='${request.body.address}' WHERE id=9 `,(err,res)=>{
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
        sql.query(`INSERT INTO tbl_contact_details  (Phone_number, email, address)
    VALUES ('${request.body.Phone_number}','${request.body.email}', '${request.body.address}');`,(err,res)=>{
      if (err) {
        console.log("testing")
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