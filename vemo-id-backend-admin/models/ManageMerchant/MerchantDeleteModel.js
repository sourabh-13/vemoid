const sql = require("../../../config/dbConnection");

exports.DeleteMerchantData = (req,result)=>{
    sql.query('DELETE FROM tbl_users WHERE id = "'+req.body.id+'"', (err,res)=>{
        if(err){
            console.log('Testing')
            result(err,null)
            return;
        }
        {
            result(null, res)
            return;
        }
    })
}