const sql = require('../config/dbConnection');
const AWS = require('aws-sdk');
exports.Globalmetadata = (appUserID,appID,transactionId,lang)=>{
    const resultrecord = [];
    sql.query('SELECT a.meta_value AS value, b.meta_key AS keyssss, b.metaLabel AS label, b.es_MetaLabel FROM tbl_meta_values a INNER JOIN tbl_meta_data b ON b.id=a.metaID WHERE a.transactionID="'+transactionId+'"  AND a.appUserID="'+appUserID+'" AND a.applicationID="'+appID+'" AND b.visibility=1',(err,res)=>{
            if(res.length>0)
            {
                res.forEach(e => {
                    var arr = {};
                    var values = e.value.replace(/"/g, '');
                    values = values.replace('[','');
                    values = values.replace(']','');
                    values = values.replace(/"/g,'');
                    arr["key"] = e.keyssss;
                    arr["value"] = values;
                    if(lang=='en')
                    {
                        arr["label"] = e.label;
                    }
                    else{
                        arr["label"] = e.es_MetaLabel;
                    }
                    resultrecord.push(arr)
                    
                    
                });
            }
    });
    
    return resultrecord
}

exports.checkExpiredAuthentication = (transactionID) =>
{
    sql.query('SELECT id,auth_status FROM tbl_app_users_transactions WHERE id="'+transactionID+'"',(err,res)=>{
        if(res.length>0)
        {
            if(res[0]['auth_status']>0)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }
        else
        {
            return 0;
        }

    });
}

exports.sendSmsAWS = (phone,message) =>{
    AWS.config.update({
        region: 'us-east-1',
        version:'2010-03-31',
        accessKeyId: 'AKIAIVLP3MSRUIL3CAQQ',
        secretAccessKey: '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'
    });

    var sns = new AWS.SNS();

    var params = {
        Message: message,
        MessageStructure: 'string',
        PhoneNumber: phone
    };
    sns.publish(params, function (err, data) {
        //if (err) console.log(err, err.stack);
        //else console.log(data);
    });

}


exports.Getmetadata = (appUserID,transactionId)=>{
    // console.log('khsdhjdghj')
    var resultMetarecord = [];
    //console.log('SELECT a.meta_value AS value, b.meta_key AS keyssss, b.metaLabel AS label, b.es_MetaLabel FROM tbl_meta_values a INNER JOIN tbl_meta_data b ON b.id=a.metaID WHERE a.transactionID="'+transactionId+'"  AND a.appUserID="'+appUserID+'"')
    sql.query('SELECT a.meta_value AS value, b.meta_key AS keyssss, b.metaLabel AS label, b.es_MetaLabel FROM tbl_meta_values a INNER JOIN tbl_meta_data b ON b.id=a.metaID WHERE a.transactionID="'+transactionId+'"  AND a.appUserID="'+appUserID+'"',(errm,resm)=>{
            if(resm.length>0)
            {
                resm.forEach(e => {
                    var arr = {};
                    var values = e.value.replace(/"/g, '');
                    values = values.replace('[','');
                    values = values.replace(']','');
                    values = values.replace(/"/g,'');
                    arr["key"] = e.keyssss;
                    arr["value"] = values;                    
                    resultMetarecord.push(arr)   
                                                      
                });
    
            
                
            }
            
           
            
    });
    
    return resultMetarecord;
   
    
}





