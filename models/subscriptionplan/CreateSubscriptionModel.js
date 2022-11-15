const sql = require("../../config/dbConnection");
exports.Createsubscriptions=(request,result)=>{

    sql.query(`INSERT INTO tbl_subscriptions (plan_name,users,app_create,sessions,support,plan_descriptions,plan_price)
    VALUES ('${request.body.plan_name}','${request.body.users}','${request.body.app_create}','${request.body.sessions}','${request.body.support}','${request.body.plan_descriptions}','${request.body.plan_price}');`,(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
  }