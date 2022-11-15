const sql = require('../../../config/dbConnection')
const metadata = require('../../../vemo-id-backend-mobile/Globalmetadata');
exports.getTransaction = (request,result)=>{
    const resultrecord = [];
    const language = request.body.language
    const langArr = ['en','es']
    var lang = 'en';
        if( langArr.includes(language))
        {
            lang = language;
        }
    sql.query('SELECT taput.*,tu.name,tu.country, tu.id AS appUserID, tu.applicationID FROM tbl_app_users_transactions taput INNER JOIN tbl_app_users tu ON tu.id=taput.user_id WHERE taput.appID="'+request.body.appID+'" ORDER BY taput.id DESC',(err,res)=>{
        if(err){
            console.log('testing')
            result(err,null)
            return;

        }

        res.forEach(e => {
            var arr = {}; 
            arr["transactionType"] = e.transactionType;
            arr['ipAddress'] = e.ipAddress;
            arr['device'] = e.device_browser;
            arr['created_at'] = e.created_at;
            arr['transactionId'] = e.generatedTransactionId;	
            arr['userName'] = e.name;
            arr['countryName'] = e.country;
            arr['auth_status'] = e.auth_status;
            arr['metaSha256Hash'] = e.metaSha256Hash;
            arr ['appUserID'] = e.user_id;
            arr['applicationID'] = e.applicationID;
            arr['transactionID'] = e.id
            arr['metadata'] = metadata.Globalmetadata(e.user_id,e.applicationID,e.id,'en');
            // console.log(res);
            resultrecord.push(arr)
            
        })

        
        // console.log(resultrecord)
        setTimeout(()=>{
            result(null, resultrecord)
            return;
        },2000)

    })
}