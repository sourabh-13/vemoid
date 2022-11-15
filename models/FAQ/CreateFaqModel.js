const sql = require("../../config/dbConnection");
exports.Createfaq=(request,result)=>{

    sql.query(`INSERT INTO tbl_faq  (questions,messages)
    VALUES ('${request.body.questions}','${request.body.messages}');`,(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
  }