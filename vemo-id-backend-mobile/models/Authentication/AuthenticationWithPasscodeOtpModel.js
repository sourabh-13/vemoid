const sql = require("../../../config/dbConnection");
const metadata = require('../../Globalmetadata');
require("dotenv").config();
const nodemailer = require("nodemailer");
const reqt = require('request');

exports.authenticationWithPasscodeOtp = (request, result) => {
  const appUserID = request.body.appUserID;
  const transactionID = request.body.transactionID;
  const applicationID = request.body.applicationID;
  var language = request.body.language;
  const langArr = ['en', 'es']
  var lang = 'en';
  if (langArr.includes(language)) {
    lang = language;
  }
  sql.query(
    'SELECT a.*, b.application_name, b.appLogo FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.id = "' +
    appUserID +
    '" AND a.applicationID= "' +
    applicationID +
    '"',
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length === 0) {
        const norec = {
          success: 'false',
          message: "Invalid Request"
        }
        result(norec, null)
        return;
      }
      const response = {
        "appUser": res[0],
        "metaData": metadata.Globalmetadata(request.body.appUserID, request.body.applicationID, request.body.transactionID, lang)
      }

      setTimeout(() => {

        result(null, response);
        return;
      }, 1000);
    }
  );
}

exports.checkSecurityCode = (request, result) => {

  sql.query('SELECT a.id,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="' + request.body.deviceToken + '" AND a.mobileSecurityCode="' + request.body.code + '"', (err, res) => {
    if (res.length === 0) {
      const norec = {
        success: 'false',
        message: "Invalid security code"
      }
      result(norec, null)
      return;
    } else {
      const response = {
        status: 200,
        message: "OK"
      }
      result(null,response);
      return;

    }});
  

}

// exports.checkSecurityCodeChangeOtp = (request,result) =>{
//     sql.query('SELECT a.id,a.mobileSecurityNewCodeCode,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="'+request.body.deviceToken+'" AND a.mobileSecurityCodeOtp="'+request.body.otp+'"',(err, res) =>{
//       if(res.length===0)
//       {
//         const norec =  {
//                           success:'false',
//                           message: "Invalid old security code or device token"
//                         }    
//         result(norec,null)
//         return;
//       }
//       else
//       {

//         sql.query('UPDATE tbl_app_users SET mobileSecurityCodeOtp="", mobileSecurityCode="'+res[0]['mobileSecurityNewCodeCode']+'" WHERE deviceToken="'+request.body.deviceToken+'" AND mobileSecurityCodeOtp="'+request.body.otp+'"',(err,res)=>{});
//         const response = {
//                           status:200,
//                           message:"security code Changed successfully"
//                         }
//         result(null, response);
//           return;
//       }

//     });
// }

// exports.createSecurityCode = (request,result) =>{
//   sql.query('SELECT a.id,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="'+request.body.deviceToken+'" ORDER BY b.application_name ASC',(err, res) =>{
//     if(res.length === 0)
//     {
//       const norec =  {
//                         success:'false',
//                         message: "Invalid Request"
//                       }    
//       result(norec,null)
//       result(null, response);
//       return;
//     }

//   });

// }

exports.checkSecurityCodeChangeOtp = (request, result) => {
  sql.query('SELECT a.id,a.mobileSecurityNewCodeCode,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="' + request.body.deviceToken + '" AND a.mobileSecurityCodeOtp="' + request.body.otp + '"', (err, res) => {
    if (res.length === 0) {
      const norec = {
        success: 'false',
        message: "Invalid old security code or device token"
      }
      result(norec, null)
      return;
    } else {

      sql.query('UPDATE tbl_app_users SET mobileSecurityCodeOtp="", mobileSecurityCode="' + res[0]['mobileSecurityNewCodeCode'] + '" WHERE deviceToken="' + request.body.deviceToken + '" AND mobileSecurityCodeOtp="' + request.body.otp + '"', (err, res) => { });
      const response = {
        status: 200,
        message: "security code Changed successfully"
      }
      result(null, response);
      return;
    }

  });
}

exports.createSecurityCode = (request, result) => {
  // const response = {
  //         status: 200,
  //         message: request.body.deviceToken
  //       }
  //       result(null, response);
  //       return;
      
  sql.query('SELECT a.id,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="' + request.body.deviceToken + '"', (err, res) => {
    
    if (res.length == 0) {
      const norec = {
        success: 'false',
        message: request.body.deviceToken
      }
      result(norec, null)
      return;
    } else {

      sql.query('UPDATE tbl_app_users SET mobileSecurityNewCodeCode="' + request.body.code + '", mobileSecurityCode="' + request.body.code + '", appCodeAuthentication=1 WHERE deviceToken="' + request.body.deviceToken + '" ', (err, res) => {
        if(err){
          //console.log("error")
        }
       });
      const response = {
        status: 200,
        message: "security code created successfully"
      }
      result(null, response);
      return;
    }

  });
}

exports.myHistory = (request, result) => {
  sql.query('SELECT a.id AS transactionId,a.auth_type,a.auth_status,a.transactionType,a.created_at AS datetime,b.application_name,b.appLogo,b.id AS appID,c.appAuthenticationStatus,c.id AS appUserID FROM tbl_app_users_transactions a  INNER JOIN tbl_application_list b ON a.appID=b.id INNER JOIN tbl_app_users c ON a.user_id=c.id WHERE c.deviceToken="' + request.body.deviceToken + '" ORDER BY a.id DESC', (err, res) => {

    if (res.length === 0) {
      const norec = {
        success: 'false',
        message: "Invalid Request"
      }
      result(norec, null)
      return;
    } else {
      const response = {
        status: 200,
        record: res
      }
      result(null, response);
      return;
    }

  })
}

exports.appRejectAuthenticationWithPasscode = (request, result) => {
  var ipAddress = request.body.ipAddress;
  if (!request.body.deviceName && request.body.deviceName == null) {
    ipAddress = "192.168.1.109";
  }
  sql.query('SELECT id FROM tbl_app_users WHERE id="' + request.body.appUserID + '" AND applicationID="' + request.body.applicationID + '"', (err, res) => {

    if (res.length > 0) {
      sql.query('UPDATE tbl_app_users SET appAuthenticationStatus=0 WHERE id="' + request.body.appUserID + '" AND  applicationID="' + request.body.applicationID + '"', (err, res) => { });

      sql.query('UPDATE tbl_app_users_transactions SET auth_status=2,ipAddress="' + ipAddress + '", device_browser="' + request.body.deviceName + '" WHERE id="' + request.body.transactionID + '"', (err, res) => { });

      const response = {
        message: "Request Rejected successfully"
      }

      result(null, response);
      return;

    } else {
      const norec = {
        status: 201,
        message: "Invalid Request"
      }
      result(norec, null)
      return;
    }

  })
}
exports.updateDeviceToken = (request, result) => {
  sql.query('SELECT id,email FROM tbl_app_users WHERE email="' + request.body.email + '"', (err, res) => {

    if (res.length > 0) {
      sql.query('UPDATE tbl_app_users SET deviceToken="' + request.body.deviceToken + '" WHERE email="' + request.body.email + '"', (err, res) => { });

      const response = {
        message: "Okay"
      }
      result(null, response);
      return;

    } else {
      const norec = {
        status: 201,
        message: "Invalid Email Address"
      }
      result(norec, null)
      return;
    }

  });
}

exports.authenticateLoginAppUserByLoginType = (request, result) => {
  var ipAddress;
  if (!request.body.ipAddress && request.body.ipAddress == null) {
    ipAddress = "192.168.1.109";
  } else {
    ipAddress = request.body.ipAddress;
  }
  sql.query('SELECT a.id AS transactionId,a.auth_type,a.auth_status,a.transactionType,a.generatedTransactionId,a.created_at AS datetime,b.applicationID,b.application_name,b.appLogo,b.id AS appID,c.appAuthenticationStatus,c.id AS appUserID,c.appFaceAuthentication,c.appThumbAuthentication,c.appCodeAuthentication,c.name,c.email,c.phone,c.country,c.appUserSetLoginType,c.mobileSecurityCode FROM tbl_app_users_transactions a INNER JOIN tbl_application_list b ON a.appID=b.id INNER JOIN tbl_app_users c ON a.user_id=c.id WHERE c.id="' + request.body.appUserID + '" AND c.applicationID="' + request.body.applicationID + '" AND a.id="' + request.body.transactionID + '"', (err, res) => {
    // result(null, res);
    //   return; 

    if (res.length > 0) {
      var messagePayload = {
        transactionID: res[0]['generatedTransactionId'],
        responseType: "login",
        name: res[0]['name'],
        phone: res[0]['phone'],
        email: res[0]['email'],
        country: res[0]['country'],
        metadata: []
      };

      sql.query('UPDATE tbl_app_users_transactions SET auth_status=3,ipAddress="' + ipAddress + '", device_browser="' + request.body.deviceName + '" WHERE id="' + res[0]['transactionId'] + '"', (err, res) => { });

      if (request.body.loginType == 1 && res[0]['appFaceAuthentication'] == 1) {
        messagePayload['status'] = 'SUCCESS';
        const response = {
          status: 200,
          message: "Login successfully"
        }
        result(null, response);
        return;
      } else if (request.body.loginType == 2 && res[0]['appThumbAuthentication'] == 1) {
        messagePayload['status'] = 'SUCCESS';
        const response = {
          status: 200,
          message: "Login successfully"
        }
        result(null, response);
        return;
      } else if (request.body.loginType == 3 && res[0]['appCodeAuthentication'] == 1) {
        if (!request.body.code && request.body.code == null) {
          const norec = {
            status: 201,
            success: "false",
            message: "Please Provide Code"
          }
          result(norec, null)
          return;
        }
        if (request.body.code === res[0]['mobileSecurityCode']) {
          messagePayload['status'] = 'SUCCESS';
          const response = {
            status: 200,
            message: "Login successfully"
          }
          result(null, response);
          return;
        } else {
          sql.query('UPDATE tbl_app_users_transactions SET auth_status=4,ipAddress="' + ipAddress + '", device_browser="' + request.body.deviceName + '" WHERE id="' + res[0]['transactionId'] + '"', (err, res) => { });

          messagePayload['status'] = 'Failed';
          const response = {
            status: 201,
            message: "Login failed"
          }
          result(null, response);
          return;
        }
      } else {
        const norec = {
          status: 201,
          success: "false",
          message: "Invalid Request"
        }
        result(norec, null)
        return;
      }


    }




  })
}
exports.loginAppUserWithQrCode = (request, result) => {
  var ipAddress;
  if (!request.body.ipAddress && request.body.ipAddress == null) {
    ipAddress = "192.168.1.109";
  } else {
    ipAddress = request.body.ipAddress;
  }
  sql.query('SELECT a.created_at AS issueAt,a.updated_at AS validatedAt,a.id AS appUserID,a.name,a.email,a.phone,a.profile_image AS userProfileImage,a.country,a.appFaceAuthentication,a.appThumbAuthentication,a.appCodeAuthentication,a.appUserSetLoginType,a.mobileSecurityCode,b.id AS appID,b.application_name,b.appLogo,b.applicationID FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.id="' + request.body.appUserID + '" AND b.applicationID="' + request.body.applicationID + '"', (err, res) => {
    // result(null, res);
    //   return; 
    var rondomNumber = Math.floor(Math.random() * 10000000000000000);
    if (res.length > 0) {
      var messagePayload = {
        transactionID: res[0]['generatedTransactionId'],
        responseType: "login",
        name: res[0]['name'],
        phone: res[0]['phone'],
        email: res[0]['email'],
        country: res[0]['country'],
        metadata: []
      };

      sql.query('INSERT INTO tbl_app_users_transactions (generatedTransactionId,appID,user_id,ipAddress,device_browser,auth_type,transactionType,auth_status) VALUES ("' + rondomNumber + '","' + res[0]['appID'] + '","' + res[0]['appUserID'] + '", "' + ipAddress + '", "' + request.body.deviceName + '",2,1,0) ', (err1, res1) => {

        var lastTransactionID = res1['insertId'];
        if (request.body.loginType == 1 && res[0]['appFaceAuthentication'] == 1) {
          messagePayload['status'] = 'SUCCESS';
          const response = {
            status: 200,
            message: "Login successfully"
          }
          result(null, response);
          return;
        } else if (request.body.loginType == 2 && res[0]['appThumbAuthentication'] == 1) {
          messagePayload['status'] = 'SUCCESS';
          const response = {
            status: 200,
            message: "Login successfully"
          }
          result(null, response);
          return;
        } else if (request.body.loginType == 3 && res[0]['appCodeAuthentication'] == 1) {
          if (!request.body.code && request.body.code == null) {
            const norec = {
              status: 201,
              success: "false",
              message: "Please Provide Code"
            }
            result(norec, null)
            return;
          }
          if (request.body.code === res[0]['mobileSecurityCode']) {
            messagePayload['status'] = 'SUCCESS';
            const response = {
              status: 200,
              message: "Login successfully"
            }
            result(null, response);
            return;
          } else {
            sql.query('UPDATE tbl_app_users_transactions SET auth_status=4,ipAddress="' + ipAddress + '", device_browser="' + request.body.deviceName + '" WHERE id="' + lastTransactionID + '"', (err, res) => { });

            messagePayload['status'] = 'Failed';
            const response = {
              status: 201,
              message: "Login failed"
            }
            result(null, response);
            return;
          }
        } else {
          sql.query('UPDATE tbl_app_users_transactions SET auth_status=4,ipAddress="' + ipAddress + '", device_browser="' + request.body.deviceName + '" WHERE id="' + lastTransactionID + '"', (err, res) => { });

          messagePayload['status'] = 'Failed';
          const response = {
            status: 201,
            message: "Login failed"
          }
          result(null, response);
          return;
        }


      });
    } else {
      const norec = {
        status: 201,
        success: "false",
        message: "Invalid Request"
      }
      result(norec, null)
      return;
    }

  })
}
exports.getMetaDataWebAuth = (request, result) => {
  const resultrecord = [];
  const lang = 'en';
  // SELECT a.meta_value AS value, b.meta_key AS keyssss, b.metaLabel AS label, b.es_MetaLabel FROM tbl_meta_values a INNER JOIN tbl_meta_data b ON b.id=a.metaID WHERE a.transactionID="'+request.body.transaction+'"  AND a.appUserID="'+request.body.userid+'" AND a.applicationID="'+request.body.appid+'" AND b.visibility=1
  sql.query('SELECT a.meta_value AS value, b.meta_key AS keyssss, b.metaLabel AS label, b.es_MetaLabel FROM tbl_meta_values a INNER JOIN tbl_meta_data b ON b.id=a.metaID WHERE a.transactionID="' + request.body.transaction + '"  AND a.appUserID="' + request.body.userid + '" AND a.applicationID="' + request.body.appid + '" AND b.visibility=1 ORDER BY b.orders', (err, res) => {
    console.log(res);
    if (res.length > 0) {
      res.forEach(e => {
        var arr = {};
        var values = e.value.replace(/"/g, '');
        values = values.replace('[', '');
        values = values.replace(']', '');
        values = values.replace(/"/g, '');
        arr["key"] = e.keyssss;
        arr["value"] = values;
        if (lang == 'en') {
          arr["label"] = e.label;
        } else {
          arr["label"] = e.es_MetaLabel;
        }
        resultrecord.push(arr)

      });
    }
  });
  setTimeout(() => {
    result(null, resultrecord);
    return;
  }, 1000);

}
exports.getApplicationDetailstaWebAuth = (request, result) => {
  sql.query('SELECT id,application_name,applicationID,description,appLogo,redirectUrl,sessionExpirationTime,privacyPolicy,tersmsOfUse,appLogo FROM tbl_application_list WHERE id="' + request.body.appid + '"', (err, res) => {
    if (res.length > 0) {
      sql.query('SELECT id,name,documentNumber FROM tbl_app_users WHERE id="' + request.body.userid + '"', (err, resUser) => {
        sql.query('SELECT id,generatedTransactionId,auth_status,updated_at FROM tbl_app_users_transactions WHERE id="' + request.body.transaction + '"', (err, resTransaction) => {
            res[0].appLogo = process.env.URL_APLICATION_IMG+res[0].appLogo;
            let dataDetail = {
              "applicationDetails": res[0],
              "userDetails": resUser[0],
              "transactionDetails": resTransaction[0]
            }
            result(null, dataDetail);
            return;
        });
      });
    } else {
      result(null, []);
      return;
    }
  });
}

exports.validateNewRegisteredUserWebAuth = (request, result) => {
  sql.query('SELECT * FROM tbl_app_users WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '" AND passcode="' + request.body.passcode + '"', (err, res) => {

    if (res.length > 0) {
      sql.query('UPDATE tbl_app_users SET status=1 WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '" AND passcode="' + request.body.passcode + '"', (err1, res1) => { });
      const generatedTransactionId = Math.floor(Math.random() * 10000000000000000) + request.body.transaction;

      sql.query('UPDATE tbl_app_users_transactions SET auth_status=1,generatedTransactionId="' + generatedTransactionId + '", ipAddress="",device_browser="" WHERE id="' + request.body.transaction + '"', (err2, res2) => { });

      result(null, 1);
      return;
    } else {
      result(null, 2);
      return;
    }

  });
}

exports.rejectAuthenticationWebAuth = (request, result) => {
  // sql.query('SELECT * FROM tbl_app_users WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '" AND passcode="' + request.body.passcode + '"', (err, res) => {
    sql.query('SELECT * FROM tbl_app_users WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '"', (err, res) => {
    if (res.length > 0) {
      const generatedTransactionId = Math.floor(Math.random() * 10000000000000000) + request.body.transaction;

      sql.query('UPDATE tbl_app_users_transactions SET auth_status=2,ipAddress="",device_browser="" WHERE id="' + request.body.transaction + '"', (err2, res2) => { });

      result(null, 1);
      return;
    } else {
      result(null, 2);
      return;
    }

  });
}

exports.updateValidateRegisteredUserWebAuth = (request, result) => {

  //metadata.sendSmsAWS('+918860063789','jai sri ram');
  //return
  let ip
  if (request.ip.substr(0, 7) == "::ffff:") {
    ip = request.ip.substr(7)
  }
  console.log("ip",request.ip, ip);
  if (request.body.passcode == 1) {
    console.log("bodyyy", request.body);
    sql.query('SELECT * FROM tbl_app_users WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '"', (err, res) => {
      if (res.length > 0) {
        sql.query('UPDATE tbl_app_users SET status=1 WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '" AND passcode="' + request.body.passcode + '" AND oneTimePassword=0', (err1, res1) => { });
        //const generatedTransactionId = Math.floor(Math.random() * 10000000000000000)+request.body.transaction;

        //sql.query('UPDATE tbl_app_users_transactions SET auth_status=1,generatedTransactionId="'+generatedTransactionId+'", ipAddress="",device_browser="" WHERE id="'+request.body.transaction+'"',(err2,res2)=>{});
        sql.query('UPDATE tbl_app_users_transactions SET auth_status=1, ipAddress="'+ip+'", device_browser="'+request.body.browser+'", updated_at=NOW() WHERE id="' + request.body.transaction + '"', (err2, res2) => { });

        sql.query('SELECT * FROM tbl_app_users_transactions WHERE id="'+request.body.transaction+'"', (err, res) => {
         const CallRequest = require('request');
          console.log("redirecURL", request.body.redirectUrl);

          
         /* CallRequest(''+request.body.redirectUrl+'?transactionId='+res[0].generatedTransactionId+'&userId='+request.body.userid+'', { json: true }, (err, res, body) => {
           if (err) { return console.log(err); }
           console.log(body.url);
           console.log(body.explanation);
         }); */
         var options = {
            'method': 'GET',
            'url': 'https://eomgjzy1c3k7qnv.m.pipedream.net',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "transactionID": res[0].generatedTransactionId,
              "status": "Aceptado",
              "userId": request.body.userid
            })
          
          };
          reqt(options, function (error, response) {
            if (error) throw new Error(error);
            console.log("res",response.body);
          });

        });


        result(null, 1);
        return;
      } else {
        result(null, 2);
        return;
      }

    });
  } else {
    sql.query('SELECT * FROM tbl_app_users WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '" AND oneTimePassword="' + request.body.passcode + '"', (err, res) => {

      if (res.length > 0) {
        sql.query('UPDATE tbl_app_users SET status=1 WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '" AND passcode="' + request.body.passcode + '" AND oneTimePassword=0', (err1, res1) => { });
        //const generatedTransactionId = Math.floor(Math.random() * 10000000000000000)+request.body.transaction;

        sql.query('UPDATE tbl_app_users_transactions SET auth_status=1 WHERE id="' + request.body.transaction + '"', (err2, res2) => { });
        /*  sql.query('UPDATE tbl_app_users_transactions SET auth_status=1,generatedTransactionId="'+generatedTransactionId+'", ipAddress="",device_browser="" WHERE id="'+request.body.transaction+'"',(err2,res2)=>{
         }); */



        result(null, 1);
        return;
      } else {
        result(null, 2);
        return;
      }

    });
  }

}
//-->
exports.updateStateExpiredTrans = (request, result) => {
  sql.query('UPDATE tbl_app_users_transactions SET auth_status= 6 WHERE id="' + request.body.transaction + '"', (err1, res1) => { });
  result(null, 1);
  return;
}

exports.resendAuthenticationOtpWebAuth = (request, result) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  sql.query('SELECT * FROM tbl_app_users WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '"', (err, res) => {

    if (res.length > 0) {
      sql.query('UPDATE tbl_app_users SET oneTimePassword="' + otp + '" WHERE id="' + request.body.userid + '" AND applicationID="' + request.body.appid + '"', (err1, res1) => { });

      var name = res[0]['name'];
      var PhoneNumber = res[0]['phone'];
      var message = "Hello " + name + ", You have been invited to accept and sign a transaction using VamoId. Your security code is " + otp + " Thanks VAMO ID";
      metadata.sendSmsAWS(PhoneNumber, message);
      //mail 21-9-2022
      var emailText =
        "You have been invited to accept and sign a transaction using VamoId. Your security code is " + otp + " Thanks VAMO ID";
      var UserName = "Hello " + name;
      var subject = "Webslaud- OTP for Signature Request";
      var message = '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' + UserName + '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' + emailText + '</td></tr><tr><td style="text-align: center; margin: 40px 0px 40px 0px; display: block;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mobappssolutions153@gmail.com",
          pass: "stxtdstzpjqxqngf",
        },
      });
      //stxtdstzpjqxqngf
      var mailOptions = {
        from: "mobappssolutions153@gmail.com",
        to: res[0]['email'],
        subject: subject,
        html: message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      //mail
      console.log(metadata.sendSmsAWS(PhoneNumber, message))
      result(null, 1);
      return;
    } else {
      result(null, 2);
      return;
    }

  });
}

//https://javascript.tutorialink.com/how-to-send-an-confirmation-email-after-registration-nodejs/