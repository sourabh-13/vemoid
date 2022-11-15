const sql = require('../../../config/dbConnection');
const metadata = require('../../Globalmetadata');
exports.getRecordDetails = (request,result)=>{
    const resultrecord = [];

    const appUserID = request.body.appUserID
    const applicationID = request.body.applicationID
    const transactionId = request.body.transactionId
    const language = request.body.language
    const langArr = ['en','es']
    var lang = 'en';
        if( langArr.includes(language))
        {
            lang = language;
        }
        sql.query('SELECT b.id AS transactionId,a.application_name,b.auth_type, b.auth_status, b.transactionType, c.appAuthenticationStatus, a.appLogo, b.created_at AS datetime, a.id AS appID,c.id AS appUserID, b.ipAddress, b.device_browser FROM tbl_app_users_transactions b INNER JOIN tbl_application_list a ON b.appID = a.id INNER JOIN tbl_app_users c ON b.user_id = c.id WHERE b.id = "'+request.body.transactionId+'"',(err,res)=>{
            if(err){
                console.log('testing!')
                result(err,null)
                return;
            }
            if(res.length===0){
                const norec =  {
                    success:'false',
                    message: "Invalid Request"
                  }    
                result(norec,null)
                return;
            }
            res.forEach(e => {
                var arr = {};
                arr["name"] = e.application_name;
                arr["day"] = e.datetime;
                arr["transactionType"] = e.transactionType;

                if(e.transactionType==0)
                {
                    if(lang=='en')
                    {
                       arr['type'] = "Auth"; 
                    }
                    else
                    {
                        arr['type'] = "Autorización";
                    }
                    
                }
                else
                {
                    if(lang=='en')
                    {
                      arr['type'] = "Login";  
                    }
                    else
                    {
                        arr['type'] = "Acceso";
                    }
                    
                }

                arr['ipAddress'] = e.ipAddress;
                arr['device'] = e.device_browser;
                arr['created_at'] = e.datetime;
                arr['metadata'] = metadata.Globalmetadata(appUserID,applicationID,transactionId,lang);
                resultrecord.push(arr)
                
            })

            if(resultrecord.length>0)
            {
                setTimeout(() => {

                    result(null, resultrecord[0]);
                    return;
                }, 1000);

                
            }
            else{
                const norec =  {
                    success:'false',
                    message: "Invalid Request"
                  }    
                result(norec,null)
                return;
            }
        })
}