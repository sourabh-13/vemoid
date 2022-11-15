const sql = require('../../../config/dbConnection')

exports.getAppuserlist = (request, result)=>{
    sql.query('SELECT a.*, COUNT(b.user_id)AS transactionCount FROM tbl_app_users a INNER JOIN tbl_app_users_transactions b ON a.id = b.user_id WHERE applicationID="'+request.body.id+'"',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;
        }
        {
            result(null, res)
            return;
        }

    })
}