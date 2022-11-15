const sql = require("../../../config/dbConnection")
exports.getAdminSendNotificationDetails = (req,result)=>{
    sql.query('SELECT * FROM tbl_notifications WHERE id='+ req.body.id, (err,res)=>{
        if(err){
            console.log("testing")
            result(null, err)
            return;
        }
        result(res, null)
        return;
    })
}