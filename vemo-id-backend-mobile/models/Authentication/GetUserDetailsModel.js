const e = require('express')
const sql = require('../../../config/dbConnection')

exports.GetuserDetails = (request,result)=>{
    const appUserID = request.body.appUserID
    sql.query('SELECT b.id AS appID, b.application_name, a.created_at AS issueAt,a.updated_at AS validatedAt,a.id AS appUserID,a.name, a.email, a.phone,a.profile_image AS userProfileImage, b.appLogo FROM tbl_application_list b INNER JOIN tbl_app_users a ON a.applicationID = b.id WHERE a.id = "'+appUserID+'"',(err,res)=>{
        if(err){
            console.log('testing!')
            result(err,null)
            return;
        }
        if(res.length>0)
        {
            result(null,res[0])
            return;
        }
        else{

           const norec =  {
                success:'false',
                message: "Invalid Request"
              }
            // result(null,norec)
            // return;

            result(norec,null)
            return;

        }
        
    })
}