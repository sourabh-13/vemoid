const sql = require('../../config/dbConnection');
const mime = require('mime');
const fs = require('fs');
var resquestWs = require('request');

exports.SendDocumentsVerification = (request,result)=>{
    sql.query('SELECT * FROM tbl_app_users WHERE id = "'+request.body.user_id+'"',(err, res) =>{
        if(res[0].documentsStatus < 2)
        {
            sql.query(`INSERT INTO tbl_requests_verification (user_id, date)
            VALUE ('${request.body.user_id}', NOW());`,(err,resVerified)=>{
              if (err) {
                console.log("testing3")
                result(err, null);
                return;
              }
                sql.query('UPDATE tbl_app_users SET documentsStatus = "'+request.body.type+'" WHERE id ="'+request.body.user_id+'"',function(errNext,respNext) {
                
                    if (errNext){
                    console.log('testing')
                    result(errNext,null)
                    return;
                    }

                    //var bodyTxt = "¡Hola,!Grupo Humano desea Verificar tu identidad , para así darte una mejor experiencia en la toma de Servicios de Salud . Aplican TyCPor favor, toma una fotografía  clara a tu Cédula de Identidad y envíala a este mismo número de WhatsApp. ¡Gracias!";
                    var bodyTxt = "tienes una notificación de vamoid";
                    var options = {
                        'method': 'POST',
                        'url': process.env.URL_TWILIO, //'https://api.twilio.com/2010-04-01/Accounts/AC35d123303b3df8704f80d40f509506e4\n/Messages.json',
                        'headers': {
                          'Authorization': process.env.TOKEN_TWILIO,
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        form: {
                          'From': 'whatsapp:+15618235179',
                          'Body': bodyTxt,
                          'To': 'whatsapp:' + res[0].phone
                        }
                    };

                    resquestWs(options, function (error, response) {
                        if (error) throw new Error(error);
                        console.log("aaaa", response.body);
                    });

                    console.log('Solicitud ejecutada');
                    result(null,respNext)
                    return;
                });  
            });
        }
        else
        {
            //console.log("else");
            sql.query('UPDATE tbl_app_users SET documentsStatus = "'+request.body.type+'" WHERE id ="'+request.body.user_id+'"',function(errNext,respNext) {
                if (errNext){
                console.log('testing')
                result(errNext,null)
                return;
                }
            
                console.log('Solicitud ejecutada');
                result(null,respNext)
                return;
            });  
        } 
    });
}

exports.GetDocumentsVerification = (request,result)=>{
    sql.query('SELECT * FROM tbl_requests_verification WHERE user_id = "'+request.body.user_id+'"',(err, res) =>{
        if (err){
            console.log('testing')
            result(err,null)
            return;
        }
        
        result(null,res)
        return res;
    });
}