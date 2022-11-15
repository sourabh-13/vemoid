const sql = require("../../config/dbConnection")

exports.ChangeStatus = (request, result)=>{
    sql.query('UPDATE  tbl_subscriptions SET status ="'+request.body.status+'" WHERE id ="'+request.body.id+'"',(err,res)=>{
        if (err) {
          console.log("testing")
          result(err, null);
          return;
        }
          result(null,res);
          return;
      });
      
}