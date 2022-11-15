const sql = require("../../../config/dbConnection");
const qr = require("qrcode");
const {
  parse
} = require("path");
const crypto = require("crypto");
var requestIp = require("request-ip");
var nodemailer = require("nodemailer");
var platform = require('platform');
const e = require("express");
var resquestWs = require('request');
//const awsService = require("../../../services/AwsSms");
//generate Activation code
function generateActivationCode(length) {
  var result = "";
  var characters =
    "LKJHGFDSAQWERTYUIOPMNBVCXZASDFGHJKLPOIUYTREWQASZXCVGHNJMLOKPBGABCDEFGHIJKLMNOPQRSTUVZYJHGFRYVBCEERRYTESFHFGTRETRUYZXCVBNMLKJHGFDSAQWERTYUIOPLKMNJHBGVFCDXSZAQWERFDSATYUYURYTCVVFFHJKLPOIUYTERASDFGHJKLMNBVCXZQWERTYYUFGHFGSHLPOIJHGFDSAQWETYMNBVCXZASDFGHJKLPOIUYTREWQ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//detect client  browser
var browser = platform.name;


exports.AuthenticationAuthApi = (request, result) => {
  const resultrecord = [];
  const resultrecordmetaData = [];
  const resultresponseedata = [];
  const language = request.body.language;
  const appID = request.body.applicationid;
  const name = request.body.name;
  const email = request.body.email;
  const documentType = request.body.documentType;
  const documentNumber = request.body.documentNumber;
  const metadata = request.body.metadata;
  const phone = request.body.phonenumber;
  const country = request.body.country;


  var dataType;
  if (Array.isArray(metadata)) {
    var arrayMetaData = metadata;
    dataType = 1;
  } else {
    var arrayMetaData = JSON.parse(metadata);
    dataType = 0;
  }
  var sha256 = crypto
    .createHash("sha256")
    .update(JSON.stringify(metadata))
    .digest("hex");
  const generatedTransactionID = Math.floor(Math.random() * 8904589045904312);
  const activationCode = generateActivationCode(14);
  const languageArr = ["en", "es"];
  var lang = "en";
  if (languageArr.includes(language)) {
    lang = language;
  }

  const clientIp = requestIp.getClientIp(request);
  //next step
  sql.query(
    'SELECT * FROM tbl_application_list WHERE applicationID = "' + appID + '"',
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length === 0) {
        const norec = {
          success: "false",
          message: "Invalid App Id",
        };
        result(norec, null);
        return;
      }

      res.forEach((e) => {
        var arr = {};
        arr["applicationName"] = e.application_name;
        arr["applicationId"] = e.id;
        arr["ipAddress"] = clientIp;
        arr["browser"] = browser;
        arr["passcode"] = "ABCD8989";
        arr["ipAddress"] = "";
        arr["browser"] = "";
        arr["passcode"] = "";
        arr["activationCode"] = activationCode;
        arr["documentType"] = documentType;
        arr["documentNumber"] = documentNumber;
        resultrecord.push(arr);
      });

      sql.query(
        'SELECT * FROM tbl_app_users WHERE email="' +
        request.body.email +
        '" AND phone = "' +
        request.body.phone +
        '"',
        (err3, responsee) => {
          if (err3) {
            result(err3, null);
            return;
          }

          if (responsee.length == 0) {
            console.log("if aaa");
            sql.query(
              `INSERT INTO tbl_app_users(ownerID,applicationID,name,email,phone,country,documentType,documentNumber,passcode) VALUE(33,'${resultrecord[0].applicationId}', '${request.body.name}', '${request.body.email}', '${request.body.phone}', '${request.body.country}', '${request.body.documentType}', '${request.body.documentNumber}', 'ABCD8989')`,

              (err4, responseappuser) => {
                if (err4) {
                  result(err4, null);
                  return;
                } else {
                  const lastInsertendID = responseappuser.insertId;

                  //transaction
                  sql.query(
                    `INSERT INTO tbl_app_users_transactions(generatedTransactionId,appID,user_id,ipAddress,device_browser,metaSha256Hash) VALUE('${generatedTransactionID}','${resultrecord[0].applicationId}', '${lastInsertendID}', '${resultrecord[0].ipAddress}', '${resultrecord[0].browser}', '${sha256}')`,
                    (errorr, responseTransaction) => {
                      if (errorr) {
                        result(errorr, null);
                        return;
                      } else {
                        const lastTransactionInsertID = responseTransaction.insertId;

                        arrayMetaData.forEach((e, index) => {
                          var meta_key_name = e.key.trim();
                          sql.query(
                            'SELECT * FROM tbl_meta_data WHERE meta_key = "' +
                            meta_key_name +
                            '" And applicationID="' +
                            resultrecord[0].applicationId +
                            '"',
                            (errmetadata, responsemetaData) => {
                              if (errmetadata) {
                                result(errmetadata, null);
                                return;
                              } else {
                                responsemetaData.forEach((m) => {
                                  var arrmeta = {};
                                  arrmeta["metaID"] = m.id;
                                  resultrecordmetaData.push(arrmeta);
                                });
                              }

                              if (responsemetaData.length != 0) {
                                var metaValue = JSON.stringify(e.value)
                                sql.query(
                                  `INSERT INTO tbl_meta_values(transactionID,applicationID,appUserID,metaID,meta_value) VALUE('${lastTransactionInsertID}','${resultrecord[0].applicationId}', '${lastInsertendID}', '${resultrecordmetaData[index].metaID}', '${metaValue}')`,
                                  (errormetainsert, responsemetainsert) => {
                                    if (errormetainsert) {
                                      result(errormetainsert, null);
                                      return;
                                    }

                                  }
                                );
                              }
                            }
                          );

                        });
                      /* arrayMetaData.forEach((e) => {
                          var meta_key_name = e.key.trim();
                          sql.query(
                            'SELECT * FROM tbl_meta_data WHERE meta_key = "' +
                            meta_key_name +
                            '" And applicationID="' +
                            resultrecord[0].applicationId +
                            '"',
                            (errmetadata, responsemetaData) => {
                              if (errmetadata) {
                                result(errmetadata, null);
                                return;
                              } else {
                                responsemetaData.forEach((m) => {
                                  var arrmeta = {};
                                  arrmeta["metaID"] = m.id;
                                  resultrecordmetaData.push(arrmeta);
                                });
                              }
                              if (responsemetaData.length != 0) {


                                var metaValue = JSON.stringify(e.value)
                                sql.query(
                                  `INSERT INTO tbl_meta_values(transactionID,applicationID,appUserID,metaID,meta_value) VALUE('${lastTransactionInsertID}','${resultrecord[0].applicationId}', '${lastInsertendID}', '${resultrecordmetaData[0].metaID}', '${metaValue}')`,
                                  (errormetainsert, responsemetainsert) => {
                                    if (errormetainsert) {
                                      result(errormetainsert, null);
                                      return;
                                    }

                                  }
                                );
                                //insert tbl_meta_data
                              }
                            }
                          );


                        }); */
                        // mail

                        //email
                        var lasinstid1 = Buffer.from(lastInsertendID.toString(), "utf8").toString("base64")
                        var lasinstid2 = Buffer.from(lasinstid1, "utf8").toString("base64")
                        var lasinstid3 = Buffer.from(lasinstid2, "utf8").toString("base64")

                        var oid1 = Buffer.from("33", "utf8").toString("base64")
                        var oid2 = Buffer.from(oid1, "utf8").toString("base64")
                        var oid3 = Buffer.from(oid2, "utf8").toString("base64")

                        var apppid = resultrecord[0].applicationId.toString();
                        var apppid1 = Buffer.from(apppid, "utf8").toString("base64")
                        var apppid2 = Buffer.from(apppid1, "utf8").toString("base64")
                        var apppid3 = Buffer.from(apppid2, "utf8").toString("base64")

                        var lasttranid1 = Buffer.from(lastTransactionInsertID.toString(), "utf8").toString("base64")
                        var lasttranid2 = Buffer.from(lasttranid1, "utf8").toString("base64")
                        var lasttranid3 = Buffer.from(lasttranid2, "utf8").toString("base64")


                        if (request.body.notifications.email) {
                          var link = 'https://vamo.id/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          //var link = 'http://localhost:3000/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          if (language == "en") {
                            var emailText =
                              "You have been invited to accept and sign a transaction by " + resultrecord[0].applicationName + ". Your default passcode is " + resultrecord[0].passcode + " Click on the following link to continue: ";
                            var UserName = "Hello " + name;
                            var messages =
                              "Hello " + name + ", You have been invited to accept and sign a transaction by " + resultrecord[0].applicationName + ". Your default passcode is " + resultrecord[0].passcode + " Click on the following link to continue:  " + link + " Thanks VAMO ID";

                            var message =
                              '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' + UserName + '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' + emailText + '</td></tr><tr><td style="text-align: center; margin: 40px 0px 40px 0px; display: block;"><a href="' + link + '" target="_blank" style="font-size:17px; color: #fff; background-color:#ff0060; padding: 10px 30px; min-width: 64px; font-weight:500; text-decoration:none;border-radius: 4px; letter-spacing: 0.02857em;">Click to Authenticate</a></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
                            var subject = "Solicitud de autenticación - VamoID";
                          } else {
                            var emailText =
                              "Autentícate aquí para tomar tu Consulta Ambulatoria:";
                            var UserName = "Hola " + name;
                            var messages =
                              "Hola " + name + ", Has sido invitado a aceptar y firmar una transacción por parte de " + resultrecord[0].applicationName + ". Su contraseña predeterminada es " + resultrecord[0].passcode + " Haz click en el siguiente link para continuar: " + link + " Thanks VAMO ID";

                            var message =
                              '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"> <div class="flyer-table-main-area"> <div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><a href="https://vamo.id/" target="_blank"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:150px;"></a></div> <table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"> <tr> <th></th> <th></th> <th></th> </tr> <tr style="padding:20px 0px 0px 0px; display: block;"> <td style="font-size:16px;">' + UserName + '</td> </tr> <tr style="padding:20px 0px 0px 0px; display: block;"> <td style="font-size:16px; line-height:30px;">' + emailText + '</td> </tr> <tr> <td style="text-align: center; margin: 40px 0px 40px 0px; display: block;"><a href="' + link + '" target="_blank" style="font-size:17px; color: #fff; background-color:#ff0060; padding: 10px 30px; min-width: 64px; font-weight:500; text-decoration:none;border-radius: 4px; letter-spacing: 0.02857em;">Autenticarme</a></td> </tr> <tr> <td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p> <p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="https://vamo.id/" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td> </tr> </table> </div></div></body></html>';
                            var subject = "Solicitud de autenticación - VamoID";
                          }

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
                            to: email,
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
                        }
                        if (request.body.notifications.whatsapp) {
                          var link = 'https://vamo.id/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          //var link = 'http://localhost:3000/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          bodyTxt = "Notificación VamoId: " + link + "";
        
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
                              'To': 'whatsapp:' + request.body.phone
                            }
                          };

                          console.error('DOMINICAN REPUBLIC-------------->' + bodyTxt)

                          resquestWs(options, function (error, response) {
                            if (error) throw new Error(error);
                            console.log("aaaa", response.body);
                          });
                        }

                      }
                    }
                  );
                }
              }
            );
            const token = Math.floor(
              Math.random() * Math.random() * 43454589359849
            );
            var responseArr = [{
              status: 200,
              transactionID: generatedTransactionID,
              message: "Authentication request has been sent to user Successfully",
              access_token: token,
              token_type: 'Bearer'
            }, ];
            result(null, responseArr);
            return;
          } else {
            console.log("else aaa");
            //else condition
            sql.query(
              'Update tbl_app_users Set ownerID=33,applicationID="' +
              resultrecord[0].applicationId +
              '",name="' +
              request.body.name +
              '",country="' +
              request.body.country +
              '",documentType="' +
              request.body.documentType +
              '",documentNumber="' +
              request.body.documentNumber +
              '" where email="' +
              request.body.email +
              '" and phone="' +
              request.body.phone +
              '" and applicationID="' +
              resultrecord[0].applicationId +
              '"',

              (err4, responseappuser) => {
                if (err4) {

                  //console.log("testing4");
                  result(err4, null);
                  return;
                }
              }
            );

            // new
            responsee.forEach((u) => {
              var arrs = {}
              arrs['checkid'] = u.id
              resultresponseedata.push(arrs)
            })

            var lastInsertendID = resultresponseedata[0].checkid

            sql.query(
              `SELECT * FROM tbl_app_users_transactions WHERE user_id ="${lastInsertendID}" ORDER BY created_at DESC LIMIT 1`,
              (errorTransaction, responseTransaction) => {
                if (responseTransaction[0].auth_status != 0) {
                  //transaction
                  sql.query(
                    `INSERT INTO tbl_app_users_transactions(generatedTransactionId,appID,user_id,ipAddress,device_browser,metaSha256Hash) VALUE('${generatedTransactionID}','${resultrecord[0].applicationId}', '${lastInsertendID}', '${resultrecord[0].ipAddress}', '${resultrecord[0].browser}', '${sha256}')`,
                    (errorr, responseTransaction) => {
                      if (errorr) {
                        result(errorr, null);
                        return;
                      } else {
                        const lastTransactionInsertID = responseTransaction.insertId;
                        arrayMetaData.forEach((e, index) => {
                          var meta_key_name = e.key.trim();
                          sql.query(
                            'SELECT * FROM tbl_meta_data WHERE meta_key = "' +
                            meta_key_name +
                            '" And applicationID="' +
                            resultrecord[0].applicationId +
                            '"',
                            (errmetadata, responsemetaData) => {
                              if (errmetadata) {
                                result(errmetadata, null);
                                return;
                              } else {
                                responsemetaData.forEach((m) => {
                                  var arrmeta = {};
                                  arrmeta["metaID"] = m.id;
                                  resultrecordmetaData.push(arrmeta);
                                });
                              }

                              if (responsemetaData.length != 0) {
                                var metaValue = JSON.stringify(e.value)
                                sql.query(
                                  `INSERT INTO tbl_meta_values(transactionID,applicationID,appUserID,metaID,meta_value) VALUE('${lastTransactionInsertID}','${resultrecord[0].applicationId}', '${lastInsertendID}', '${resultrecordmetaData[index].metaID}', '${metaValue}')`,
                                  (errormetainsert, responsemetainsert) => {
                                    if (errormetainsert) {
                                      result(errormetainsert, null);
                                      return;
                                    }

                                  }
                                );
                              }
                            }
                          );

                        });
                        // mail
                        const token = Math.floor(
                          Math.random() * Math.random() * 43454589359849
                        );
                        //email 
                        var lasinstid1 = Buffer.from(lastInsertendID.toString(), "utf8").toString("base64")
                        var lasinstid2 = Buffer.from(lasinstid1, "utf8").toString("base64")
                        var lasinstid3 = Buffer.from(lasinstid2, "utf8").toString("base64")

                        var oid1 = Buffer.from("33", "utf8").toString("base64")
                        var oid2 = Buffer.from(oid1, "utf8").toString("base64")
                        var oid3 = Buffer.from(oid2, "utf8").toString("base64")

                        var apppid = resultrecord[0].applicationId.toString();
                        var apppid1 = Buffer.from(apppid, "utf8").toString("base64")
                        var apppid2 = Buffer.from(apppid1, "utf8").toString("base64")
                        var apppid3 = Buffer.from(apppid2, "utf8").toString("base64")

                        var lasttranid1 = Buffer.from(lastTransactionInsertID.toString(), "utf8").toString("base64")
                        var lasttranid2 = Buffer.from(lasttranid1, "utf8").toString("base64")
                        var lasttranid3 = Buffer.from(lasttranid2, "utf8").toString("base64")


                        if (request.body.notifications.email) {
                          //var link = 'http://localhost:3000/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          var link = 'https://vamo.id/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          if (language == "en") {
                            // var emailText =
                            //   "You have been invited to accept and sign a transaction by "+resultrecord[0].applicationName+". Your default passcode is "+resultrecord[0].passcode+" Click on the following link to continue: ";
                            var emailText =
                              "You have been invited to accept and sign a transaction by " + resultrecord[0].applicationName + ". Click on the following link to continue: ";
                            var UserName = "Hello " + name;
                            var messages =
                              "Hello " + name + ", You have been invited to accept and sign a transaction by " + resultrecord[0].applicationName + ". Click on the following link to continue: : " + link + " Thanks VAMO ID";

                            var message =
                              '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' + UserName + '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' + emailText + '</td></tr><tr><td style="text-align: center; margin: 40px 0px 40px 0px; display: block;"><a href="' + link + '" target="_blank" style="font-size:17px; color: #fff; background-color:#ff0060; padding: 10px 30px; min-width: 64px; font-weight:500; text-decoration:none;border-radius: 4px; letter-spacing: 0.02857em;">Click to Authenticate</a></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
                            var subject = "Solicitud de autenticación - VamoID";
                          } else {
                            var emailText =
                              "Autentícate aquí para tomar tu Consulta Ambulatoria:";
                            var UserName = "Hola " + name;
                            var messages =
                              "Hola " + name + ", Has sido invitado a aceptar y firmar una transacción por parte de " + resultrecord[0].applicationName + ". Su contraseña predeterminada es " + resultrecord[0].passcode + " Haz click en el siguiente link para continuar: " + link + " Thanks VAMO ID";

                            var message =
                              '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"> <div class="flyer-table-main-area"> <div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><a href="https://vamo.id/" target="_blank"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:150px;"></a></div> <table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"> <tr> <th></th> <th></th> <th></th> </tr> <tr style="padding:20px 0px 0px 0px; display: block;"> <td style="font-size:16px;">' + UserName + '</td> </tr> <tr style="padding:20px 0px 0px 0px; display: block;"> <td style="font-size:16px; line-height:30px;">' + emailText + '</td> </tr> <tr> <td style="text-align: center; margin: 40px 0px 40px 0px; display: block;"><a href="' + link + '" target="_blank" style="font-size:17px; color: #fff; background-color:#ff0060; padding: 10px 30px; min-width: 64px; font-weight:500; text-decoration:none;border-radius: 4px; letter-spacing: 0.02857em;">Autenticarme</a></td> </tr> <tr> <td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p> <p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="https://vamo.id/" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td> </tr> </table> </div></div></body></html>';
                            var subject = "Solicitud de autenticación - VamoID";
                          }

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
                            to: email,
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
                        }
                        if (request.body.notifications.whatsapp) {
                          var link = 'https://vamo.id/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          //var link = 'http://localhost:3000/reactjsnodejs/#/updateSignatureAuthenticationWithOtp/' + lasinstid3 + '/' + oid3 + '/' + apppid3 + '/' + lasttranid3 + '/1';
                          bodyTxt = "Notificación VamoId: " + link + "";
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
                              'To': 'whatsapp:' + request.body.phone
                            }
                          };

                          console.error('DOMINICAN REPUBLIC-------------->' + bodyTxt)

                          resquestWs(options, function (error, response) {
                            if (error) throw new Error(error);
                            console.log("aaaa", response.body);
                          });
                        }
                        /* if (request.body.notifications.sms) {
                          let textSms = "";
                          let link = URL_WALLET + certificateCode;
                          let mapSms = {};
                          let templateProperties = JSON.parse(templateObject.jsonValues);
                          
                          if (await util.verifyEmptyValue(templateProperties[SMS])) {
                            mapSms = await util.extractPlaceHolders(templateProperties[SMS]);
                            mapSms = await util.mergeData(mapSms, mapHtml);
                            mapSms[additionalPlaceHoldersHtml.linkCertificate] = link;
                            textSms = branchInfo.companyName + " - " + templateProperties[SMS];
                          } else {
                            textSms = branchInfo.companyName + SMS_DEFAULT_PART_TEXT + link;
                          }
                        
                          let smsId = "";
                          let staticValues = JSON.parse(person.staticValues);
                          mapSms[additionalPlaceHoldersHtml.codigo] = certificateCode;
                          mapSms[additionalPlaceHoldersHtml.code] = certificateCode;
                          mapSms[additionalPlaceHoldersHtml.tiedocsCode] = certificateCode;
                          mapSms[additionalPlaceHoldersHtml.tiedocsCodeLink] = URL_WALLET + certificateCode;
                          if (request.body.phone) {
                            //smsId = awsService.sendSms(textSms, staticValues.phone);
                          } else {
                            console.log("Phone not found:: Not phone asociated " + person.email);
                          }
                        
                          return smsId;
                        } */
                      }
                    }
                  );
                  console.log("responseTransaction", responseTransaction);
                  var responseArr = [{
                    status: 200,
                    transactionID: generatedTransactionID,
                    message: "Authentication request sent again Successfully",
                  }, ];
                  result(null, responseArr);
                  return;
                } else {
                  var responseArr = [{
                    status: 200,
                    message: "You already have a transaction in progress",
                  }, ];
                  result(null, responseArr);
                  return;
                }
              }
            );
            // new
          }
        }
      );

    }
  );
};