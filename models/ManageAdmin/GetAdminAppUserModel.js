const sql  = require('../../config/dbConnection')

exports.getAdminAppuser = (request,result)=>{
/*     sql.query('SELECT * FROM tbl_app_users WHERE ownerID = "'+request.body.ownerID+'" ',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }

        {
            console.log(res)
            result(null, res)
            return;
        }
    }) */

    sql.query('SELECT * FROM tbl_app_users',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }

        {
           // console.log(res)
            result(null, res)
            return;
        }
    })
}