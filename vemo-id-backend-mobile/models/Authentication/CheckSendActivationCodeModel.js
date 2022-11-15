const sql = require("../../../config/dbConnection");
const crypto = require("crypto");
var nodemailer = require("nodemailer");
var FCM = require("fcm-node");
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

exports.checkSendActivationCode = (request, result) => {
  const resultrecord = [];
  const resultappuser = [];
  const resultUserId = [];
  const resultresponseedata = [];
  const resultrecordmetaData = [];
  const resultauthentication = [];
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
  var arrayMetaData;
  if (Array.isArray(metadata)) {
    arrayMetaData = metadata;
    dataType = 1;
  } else {
    arrayMetaData = JSON.parse(metadata);
    dataType = 0;
  }
  var sha256 = crypto
    .createHash("sha256")
    .update(JSON.stringify(metadata))
    .digest("hex");

  const generatedTransactionID = Math.floor(Math.random() * 8904589045904312);

  const activationCode = generateActivationCode(14);

  const random = Math.floor(Math.random() * 89045890459);
  const languageArr = ["en", "es"];
  var lang = "en";
  // if (languageArr.includes(language)) {
  //   lang = language;
  // }
  if (languageArr.includes(language)) {
    lang = language;
  }

  sql.query(
    'SELECT * FROM tbl_application_list WHERE applicationid = "' + appID + '"',
    (err, res) => {
      if (err) {
        //console.log("error");
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
        arr["ipAddress"] = "10.10.10.204";
        arr["browser"] = "Google Chrome";
        arr["passcode"] = "ABCD8989";
        arr["activationCode"] = activationCode;
        arr["documentType"] = documentType;
        arr["documentNumber"] = documentNumber;
        resultrecord.push(arr);
      });

      const notificationDescription =
        "You have been invited for Request signature by " +
        resultrecord[0].applicationName +
        " , please Verify & Accept Request Signature before its expired.";
      const notiTitle =
        "Request Signature from " + resultrecord[0].applicationName;

      sql.query(
        'SELECT * FROM tbl_app_users WHERE email = "' +
          request.body.email +
          '" AND phone = "' +
          request.body.phone +
          '" AND appActivationStatus=1',
        (errAppusers, responseAppuser) => {
          if (errAppusers) {
            console.log("errorAppuser");
            result(errAppusers, null);
            return;
          }
          responseAppuser.forEach((m) => {
            var ar = {};
            ar["mobileSecurityCode"] = m.mobileSecurityCode;
            ar["deviceToken"] = m.deviceToken;
            resultappuser.push(ar);
          });
          // console.log(resultappuser);

          // console.log("helllllllll")
          // console.log(responseAppuser)
          if (responseAppuser.length != 0) {
            sql.query(
              'SELECT * FROM tbl_app_users WHERE email = "' +
                request.body.email +
                '" AND phone = "' +
                request.body.phone +
                '" AND applicationid = "' +
                resultrecord[0].applicationId +
                '"',
              (checkError, CheckResponse) => {
                if (checkError) {
                  console.log("checkError");
                  result(checkError, null);
                  return;
                }

                CheckResponse.forEach((u) => {
                  var ar = {};
                  ar["userid"] = u.id;
                  resultUserId.push(ar);
                });

                if (CheckResponse.length == 0) {
                  sql.query(
                    'UPDATE tbl_app_users SET ownerID = 33, applicationid = "' +
                      resultrecord[0].applicationId +
                      '", name = "' +
                      name +
                      '", country = "' +
                      country +
                      '", documentType = "' +
                      documentType +
                      '", documentNumber = "' +
                      documentNumber +
                      '", mobileSecurityCode = "' +
                      resultappuser[0].mobileSecurityCode +
                      '", activationCode="' +
                      activationCode +
                      '" WHERE email = "' +
                      email +
                      '" AND phone = "' +
                      request.body.phone +
                      '" AND applicationid = "' +
                      request.body.applicationID +
                      '"',
                    (updateErr, responseUpdate) => {
                      if (updateErr) {
                        //console.log("update Err");
                        result(updateErr, null);
                        return;
                      }
                      //   console.log("test!");
                      //   console.log(responseUpdate);
                    }
                  );
                }     

                //new

                res.forEach((u) => {
                  var arrs = {};
                  arrs["checkid"] = u.id;
                  resultresponseedata.push(arrs);
                });
                var lastInsertendID = resultresponseedata[0].checkid;

                //new

                sql.query(
                  `INSERT INTO tbl_app_users_transactions(generatedTransactionId,appID,user_id,ipAddress,device_browser,metaSha256Hash,auth_type) VALUE('${generatedTransactionID}','${
                    resultrecord[0].applicationId
                  }','${resultUserId[0].userid}','${
                    resultrecord[0].ipAddress
                  }','${resultrecord[0].browser}','${sha256}','${2}')`,
                  (insertErr, responseTransaction) => {
                    if (insertErr) {
                      //console.log("insert err!");
                      result(insertErr, null);
                      return;
                    }

                    //meta data
                    else {
                      const lastTransactionInsertID =
                        responseTransaction.insertId;
                      arrayMetaData.forEach((e) => {
                        var meta_key_name = e.key.trim();
                        //console.log("metakey test!")
                        //console.log(meta_key_name)
                        sql.query(
                          'SELECT id FROM tbl_meta_data WHERE meta_key = "' +
                            meta_key_name +
                            '" And applicationid="' +
                            resultrecord[0].applicationId +
                            '"',
                          (errmetadata, responsemetaData) => {
                            if (errmetadata) {
                              console.log("error");
                              result(errmetadata, null);
                              return;
                            } else {
                              if (responsemetaData.length != 0) {
                              responsemetaData.forEach((m) => {
                                var arrmeta = {};
                                arrmeta["metaID"] = m.id;
                                //insert
                                                                
                                  var metaValue = JSON.stringify(e.value);
                                  
                                  sql.query(
                                    `INSERT INTO tbl_meta_values(transactionID,applicationid,appUserID,metaID,meta_value) VALUE('${lastTransactionInsertID}','${resultrecord[0].applicationId}', '${resultUserId[0].userid }', '${m.id}', '${metaValue}')`,
                                    (errormetainsert, responsemetainsert) => {
                                      if (errormetainsert) {
                                        console.log("errormetainsert");
                                        result(errormetainsert, null);
                                        return;
                                      }
                                        console.log("metadata insert1")
                                        console.log(responsemetainsert)
                                    }
                                  );
                                  //insert tbl_meta_data
                               
                                //insert
                                resultrecordmetaData.push(arrmeta);
                              });
                            }

                              
                            }
                          }
                        );
                      });
                      //sendNotificationpending
                      var serverKey =
                        "AAAARD8HtUg:APA91bFa1V8prQawBWhzOw9pAi3I_fgEfWox6Dh4-groLAYAalhtW4Jezr5ek5Fb_zDcGiyGKUbKv6Tun6OtO6mdARpySTyVxdXypYS5YYKGjOdGnYEIP0dE4z-1fsPqV2X3VKe_6Qwq";
                      var fcm = new FCM(serverKey);
                      var android =
                        2 +
                        "*" +
                        lastTransactionInsertID +
                        "*" +
                        resultUserId[0].userid +
                        "*" +
                        resultrecord[0].applicationId;
                      var deviceToken = resultappuser[0].deviceToken;
                      var message = {
                        to: deviceToken,
                        notification: {
                          title: notiTitle,
                          body: notificationDescription,
                          sound: android,
                          transactionID: lastTransactionInsertID,
                          appUserID: resultUserId[0].userid,
                          applicationID: resultrecord[0].applicationId,
                          notiType: 2,
                        },
                      };
                      console.log(message)

                      fcm.send(message, function (err, response) {
                        if (err) {
                          console.log("Something has gone wrong!" + err);
                          console.log("Respponse:! " + response);
                        } else {
                          // showToast("Successfully sent with response");
                          console.log(
                            "Successfully sent with response: ",
                            response
                          );
                        }
                      });

                      //send Notificationpending
                    }

                    //meta data
                  }
                );
              }
            );

            var responseArr = [
              {
                status: 200,
                transactionID: generatedTransactionID,
                message: "Notification sent Successfully",
              },
            ];

            result(null, responseArr);
            return;
          }
          //else Condition
          else {
            sql.query(
              'SELECT * FROM tbl_app_users WHERE email = "' +
                request.body.email +
                '" AND phone = "' +
                request.body.phone +
                '" AND appActivationStatus=1',
              (errAppusers, responseAppuser) => {
                //console.log("responseAppuser")
                //console.log(responseAppuser.length)
                if (errAppusers) {
                  console.log("errorAppuser");
                  result(errAppusers, null);
                  return;
                }
                if (responseAppuser.length == 0) {
                  const norec = {
                    status: 201,
                    message:
                      "Invalid user details or activation code not accepted",
                  };
                  result(norec, null);
                  return;
                }

                responseAppuser.forEach((e) => {
                  var arr = {};
                  arr["appAuthenticationStatus"] = e.appAuthenticationStatus;
                  resultauthentication.push(arr);
                });
                const appAuthenticationS =
                  resultauthentication[0].appAuthenticationStatus;
                //console.log("authenticaiton checking error")
                //console.log(resultauthentication)

                if (appAuthenticationS.length == 0) {
                  sql.query(
                    `INSERT INTO tbl_app_users_transactions(generatedTransactionId,appID,user_id,ipAddress,device_browser,metaSha256Hash,auth_type) VALUE('${generatedTransactionID}','${
                      resultrecord[0].applicationId
                    }','${resultUserId[0].userid}','${
                      resultrecord[0].ipAddress
                    }','${resultrecord[0].browser}','${sha256}','${2}')`,
                    (insertErr, responseTransaction) => {
                      if (insertErr) {
                        console.log("insert err!");
                        result(insertErr, null);
                        return;
                      }

                      //meta data
                      else {
                        const lastTransactionInsertID =
                          responseTransaction.insertId;
                        arrayMetaData.forEach((e) => {
                          var meta_key_name = e.key.trim();
                          //console.log("metakey test")
                          //console.log(meta_key_name)

                          sql.query(
                            'SELECT id FROM tbl_meta_data WHERE meta_key = "' +
                              meta_key_name +
                              '" And applicationid="' +
                              resultrecord[0].applicationId +
                              '"',
                            (errmetadata, responsemetaData) => {
                              if (errmetadata) {
                                //console.log("error");
                                result(errmetadata, null);
                                return;
                              } else {
                                //console.log(responsemetaData);
                                if (responsemetaData.length != 0) {
                                responsemetaData.forEach((m) => {
                                  var arrmeta = {};
                                  arrmeta["metaID"] = m.id;
                                  //insert
                                  
                                    //insert tbl_meta_data
                                    //console.log(e.value);
                                    var metaValue = JSON.stringify(e.value);
                                    sql.query(
                                      `INSERT INTO tbl_meta_values(transactionID,applicationid,appUserID,metaID,meta_value) VALUE('${lastTransactionInsertID}','${resultrecord[0].applicationId}', '${resultUserId[0].userid }', '${m.id}', '${metaValue}')`,
                                      (errormetainsert, responsemetainsert) => {
                                        if (errormetainsert) {
                                          console.log("errormetainsert");
                                          result(errormetainsert, null);
                                          return;
                                        }
                                          console.log("metadata insert2")
                                          console.log(responsemetainsert)
                                      }
                                    );
                                    //insert tbl_meta_data
                                  
                                  //insert
                                  resultrecordmetaData.push(arrmeta);
                                });
                              }
                              }
                              
                            }
                          );
                        });
                        //sendNotificationpending
                        var serverKey =
                          "AAAARD8HtUg:APA91bFa1V8prQawBWhzOw9pAi3I_fgEfWox6Dh4-groLAYAalhtW4Jezr5ek5Fb_zDcGiyGKUbKv6Tun6OtO6mdARpySTyVxdXypYS5YYKGjOdGnYEIP0dE4z-1fsPqV2X3VKe_6Qwq";
                        var fcm = new FCM(serverKey);
                        var android =
                          2 +
                          "*" +
                          lastTransactionInsertID +
                          "*" +
                          resultUserId[0].userid +
                          "*" +
                          resultrecord[0].applicationId;
                        var deviceToken = resultappuser[0].deviceToken;

                        var message = {
                          to: deviceToken,
                          notification: {
                            title: notiTitle,
                            body: notificationDescription,
                            sound: android,
                            transactionID: lastTransactionInsertID,
                            appUserID: resultUserId[0].userid,
                            applicationID: resultrecord[0].applicationId,
                            notiType: 2,
                          },
                        };
                        //console.log(message)

                        fcm.send(message, function (err, response) {
                          if (err) {
                            console.log("Something has gone wrong!" + err);
                            console.log("Respponse:! " + response);
                          } else {
                            // showToast("Successfully sent with response");
                            // console.log(
                            //   "Successfully sent with response: ",
                            //   response
                            // );
                            var responseArr = [
                              {
                                status: 200,
                                transactionID: generatedTransactionID,
                                message: "Notification sent Successfully",
                              },
                            ];

                            result(null, responseArr);
                            return;
                          }
                        });

                        //send Notificationpending
                      }

                      //meta data
                    }
                  );
                }
                //testing else Condition
                else {
                  //console.log("Condition For Testing!")
                  sql.query(
                    'UPDATE tbl_app_users SET ownerID=33,applicationID="' +
                      request.body.applicationID +
                      '",name="' +
                      request.body.name +
                      '", country="' +
                      req.body.country +
                      '",activationCode="' +
                      request.body.activationCode +
                      '",documentType="' +
                      request.body.documentType +
                      '", documentNumber="' +
                      request.body.documentNumber +
                      '" WHERE email="' +
                      email +
                      '" AND phone = "' +
                      phone +
                      '" AND applicationid = "' +
                      resultrecord[0].applicationId +
                      '"',
                    (err6, res6) => {
                      if (err6) {
                        console.log("error6");
                        result(err6, null);
                        return;
                      }
                      //console.log("updated app users")

                      sql.query(
                        `INSERT INTO tbl_app_users_transactions(generatedTransactionId,appID,user_id,ipAddress,device_browser,metaSha256Hash,auth_type) VALUE('${generatedTransactionID}','${
                          resultrecord[0].applicationId
                        }','${resultUserId[0].userid}','${
                          resultrecord[0].ipAddress
                        }','${resultrecord[0].browser}','${sha256}','${2}')`,
                        (err7, res7) => {
                          if (err7) {
                            result(err7, null);
                            return;
                          }
                          //Meta data
                          else {
                            const lastTransactionInsertID =
                              responseTransaction.insertId;
                            arrayMetaData.forEach((e) => {
                              var meta_key_name = e.key.trim();
                              sql.query(
                                'SELECT id FROM tbl_meta_data WHERE meta_key = "' +
                                  meta_key_name +
                                  '" And applicationid="' +
                                  resultrecord[0].applicationId +
                                  '"',
                                (errmetadata, responsemetaData) => {
                                  if (errmetadata) {
                                    //console.log("error");
                                    result(errmetadata, null);
                                    return;
                                  } else {
                                    //console.log(responsemetaData);
                                    if (responsemetaData.length != 0) {
                                    responsemetaData.forEach((m) => {
                                      var arrmeta = {};
                                      arrmeta["metaID"] = m.id;
                                      //insert
                                      
                                        //insert tbl_meta_data
                                        //console.log(e.value);
                                        var metaValue = JSON.stringify(e.value);
                                        sql.query(
                                          `INSERT INTO tbl_meta_values(transactionID,applicationid,appUserID,metaID,meta_value) VALUE('${lastTransactionInsertID}','${resultrecord[0].applicationId}', '${resultUserId[0].userid }', '${m.id}', '${metaValue}')`,
                                          (errormetainsert, responsemetainsert) => {
                                            if (errormetainsert) {
                                              console.log("errormetainsert");
                                              result(errormetainsert, null);
                                              return;
                                            }
                                              //console.log("metadata insert3")
                                             // console.log(responsemetainsert)
                                          }
                                        );
                                        //insert tbl_meta_data
                                     
                                      //insert
                                      resultrecordmetaData.push(arrmeta);
                                    });
                                  }
                                    

                                  }
                                  
                                }
                              );
                            });
                            //sendNotificationpending
                            var serverKey =
                              "AAAARD8HtUg:APA91bFa1V8prQawBWhzOw9pAi3I_fgEfWox6Dh4-groLAYAalhtW4Jezr5ek5Fb_zDcGiyGKUbKv6Tun6OtO6mdARpySTyVxdXypYS5YYKGjOdGnYEIP0dE4z-1fsPqV2X3VKe_6Qwq";
                            var fcm = new FCM(serverKey);
                            var android =
                              2 +
                              "*" +
                              lastTransactionInsertID +
                              "*" +
                              resultUserId[0].userid +
                              "*" +
                              resultrecord[0].applicationId;
                            var deviceToken = resultappuser[0].deviceToken;
                            var message = {
                              to: deviceToken,
                              notification: {
                                title: notiTitle,
                                body: notificationDescription,
                                sound: android,
                                transactionID: lastTransactionInsertID,
                                appUserID: resultUserId[0].userid,
                                applicationID: resultrecord[0].applicationId,
                                notiType: 2,
                              },
                            };
                            //console.log(message)

                            fcm.send(message, function (err, response) {
                              if (err) {
                                console.log("Something has gone wrong!" + err);
                                console.log("Respponse:! " + response);
                              } else {
                                // showToast("Successfully sent with response");
                                // console.log(
                                //   "Successfully sent with response: ",
                                //   response
                                // );
                                var responseArr = [
                                  {
                                    status: 200,
                                    transactionID: generatedTransactionID,
                                    message:
                                      "Notification sent again Successfully",
                                  },
                                ];

                                result(null, responseArr);
                                return;
                              }
                            });
                          }

                          //Meta data
                        }
                      );
                    }
                  );
                }
              }
            );

            // var responseArr = [
            //   {
            //     status: 200,
            //     transactionID: generatedTransactionID,
            //     message: "Notification sent Successfully",
            //   },
            // ];

            // result(null, responseArr);
            // return;
          }
        }
      );
    }
  );
};
