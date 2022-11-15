const sql = require("../../../config/dbConnection");

exports.GetAdminSenddata = (request,result)=>{
    // var user_id = request.body.user_id;
    // console.log(user_id)
   
    sql.query('SELECT * FROM tbl_notifications WHERE user_id= '+ request.body.user_id, (err,res )=>{
        if(err){
            console.log("err")
            result(err, null)
            return
        }
        {
            result(null, res)
            return
        }
    })

   
}

