const sql = require('../../config/dbConnection');

exports.Editsubscription = (request,result)=>{ 
   sql.query('UPDATE  tbl_subscriptions SET plan_name ="'+request.body.plan_name+'", plan_descriptions ="'+request.body.plan_descriptions+'",  users ="'+request.body.users+'",  app_create ="'+request.body.app_create+'",  sessions ="'+request.body.sessions+'",  support ="'+request.body.support+'",  plan_price ="'+request.body.plan_price+'" WHERE id ="'+request.body.id+'"',(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });
    
}