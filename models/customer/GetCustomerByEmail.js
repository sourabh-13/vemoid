const sql = require("../../config/dbConnection")

exports.getCustomerByEmail = (request, result)=>{
    sql.query('SELECT name, email, country, documentType, documentNumber FROM  tbl_app_users WHERE email = "'+request.body.email+'" ORDER BY id DESC LIMIT 1',(err,res)=>{
        if (err) {
          result(err, null);
          return;
        }
          result(null,res);
          return;
    });
}
