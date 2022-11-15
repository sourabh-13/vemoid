const sql = require("../config/dbConnection");
exports.Merchants=(request,result)=>{

    sql.query(`INSERT INTO tbl_users  (registartion_number,country, email, company_name , address, Phone_number, Password)
    VALUES ('${request.body.registartion_number}','${request.body.country}','${request.body.email}','${request.body.company_name}','${request.body.address}','${request.body.phone_number}','${request.body.password}');`,(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
  }
