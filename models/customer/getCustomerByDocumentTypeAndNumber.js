const sql = require("../../config/dbConnection")

exports.getCustomerByDocumentTypeAndNumber = (request, result)=>{
    sql.query('SELECT name, email, country, documentType, documentNumber FROM  tbl_app_users WHERE documentType = "'+request.body.documentType+'" AND documentNumber = "'+request.body.documentNumber+'" AND country = "'+request.body.country+'" ORDER BY id DESC LIMIT 1',(err,res)=>{
        if (err) {
          result(err, null);
          return;
        }
          result(null,res);
          return;
    });
}

