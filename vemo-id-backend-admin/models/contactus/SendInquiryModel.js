const sql = require('../../../config/dbConnection')

exports.Sendenquiry = (request, result)=>{
    sql.query(`INSERT INTO tbl_contact_inquiries (name, email, phone_number, subject, message)
    VALUES ('${request.body.name}','${request.body.email}','${request.body.phone_number}','${request.body.subject}','${request.body.message}');`,(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
}