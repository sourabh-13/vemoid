const { response } = require("express");
const sql = require("../../../config/dbConnection");
var nodemailer = require("nodemailer");
const qr = require("qrcode");
const crypto = require("crypto");
var requestIp = require("request-ip");

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
//QR code function
// const generateQR = async text => {
//   try {
//     console.log(await qr.toDataURL(text))
//   } catch (err) {
//     console.error(err)
//   }
// }
const generateQR = async (text) => {
  try {
    const random = Math.floor(Math.random() * 89045890459);
    var imagename = Date.now() + random;
    await qr.toFile("./public/qrCode/" + imagename + ".png", text);
  } catch (err) {
    console.error(err);
  }
  return imagename;
};

exports.sendActivationCode = (request, result) => {
  const resultrecord = [];
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
  const generatedTransactionID = Math.floor(Math.random() * 8904589045904312);

  const activationCode = generateActivationCode(14);

  const random = Math.floor(Math.random() * 89045890459);
  var imagename = Date.now() + random;
  qr.toFile("./public/qrCode/" + imagename + ".png", activationCode);
  //console.log(imagename);
  //var qrimage = app.use('./public/uploads/qrCode/'+imagename+'.png');
  //console.log(imagename);
  //QR code
  const languageArr = ["en", "es"];
  var lang = "en";
  // if (languageArr.includes(language)) {
  //   lang = language;
  // }
  if (languageArr.includes(language)) {
    lang = language;
  }
  //console.log("language")
  //console.log(language)
  sql.query(
    'SELECT * FROM tbl_application_list WHERE applicationID = "' + appID + '"',
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
      //console.log(resultrecord[0].applicationName)

      if (appID == "YW4eTzsB") {
        sql.query(
          'SELECT * FROM tbl_testing_customers WHERE email = "' + email + '"',
          (err1, resp) => {
            if (err1) {
              console.log("error");
              result(err1, null);
              return;
            }

            if (resp.length == 0) {
              sql.query(
                `INSERT INTO tbl_testing_customers(name,email,phonenumber,country) VALUE('${request.body.name}', '${request.body.email}', '${request.body.phone}', '${request.body.country}')`,
                (err2, response) => {
                  if (err2) {
                    console.log("error");
                    result(err, null);
                    return;
                  }
                }
              );
            }
          }
        );
      }

      sql.query(
        'SELECT * FROM tbl_app_users WHERE email="' +
          request.body.email +
          '" AND phone = "' +
          request.body.phone +
          '" AND applicationID = "' +
          resultrecord[0].applicationId +
          '"',
        (err3, responsee) => {
          if (err3) {
            console.log("testing purpose!");
            result(err3, null);
            return;
          }

          if (responsee.length == 0) {
            sql.query(
              `INSERT INTO tbl_app_users(ownerID,applicationID,name,email,phone,country,documentType,documentNumber,activationCode) VALUE(33,'${resultrecord[0].applicationId}', '${request.body.name}', '${request.body.email}', '${request.body.phone}', '${request.body.country}', '${request.body.documentType}', '${request.body.documentNumber}', '${activationCode}')`,

              (err4, responseappuser) => {
                if (err4) {
                  console.log(responseappuser);
                  //console.log("testing4");
                  result(err4, null);
                  return;
                }
              }
            );
            const token = Math.floor(
              Math.random() * Math.random() * 43454589359849
            );
            //email
            if (language == "en") {
              var emailText =
                "You have been invited to accept and sign a transaction by " +
                resultrecord[0].applicationName +
                ". Your default activation code is " +
                activationCode;
              var UserName = "Hello " + name;
              var messages =
                "Hello " +
                name +
                ", You have been invited to accept and sign a transaction by " +
                resultrecord[0].applicationName +
                ". Your default activation code is " +
                activationCode +
                " Thanks VAMO ID";

              var message =
                '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' +
                UserName +
                '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' +
                emailText +
                '</td></tr><tr><td style="text-align:center;" ><img src="cid:qrcode" alt="qrcode" style="width:170px;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
              var subject = "Webslaud- Update your information with Vamo ID";
            } else {
              var emailText =
                "Has sido invitado a aceptar y firmar una transacción por parte de " +
                resultrecord[0].applicationName +
                ". Su contraseña predeterminada es " +
                activationCode;
                var UserName = "Hola " + name;
              var messages =
                "Hola " +
                name +
                ", Has sido invitado a aceptar y firmar una transacción por parte de " +
                resultrecord[0].applicationName +
                ". Su contraseña predeterminada es " +
                activationCode +
                " Thanks VAMO ID";

              var message =
                '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' +
                UserName +
                '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' +
                emailText +
                '</td></tr><tr><td style="text-align:center;" ><img src="cid:qrcode" alt="qrcode" style="width:170px;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
              var subject = "Webslaud- Actualiza tus datos con Vamo ID";
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
              attachments: [
                {
                  filename: imagename + ".png",
                  path: "./public/qrCode/" + imagename + ".png",
                  cid: "qrcode",
                },
              ],
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            //console.log(token)
          } else {
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
                '",activationCode="' +
                activationCode +
                '" where email="' +
                request.body.email +
                '" and phone="' +
                request.body.phone +
                '" and applicationID="' +
                resultrecord[0].applicationId +
                '"',

              (err4, responseappuser) => {
                if (err4) {
                  //console.log(responseappuser);
                  //console.log("testing4");
                  result(err4, null);
                  return;
                }
              }
            );
            const token = Math.floor(
              Math.random() * Math.random() * 43454589359849
            );
            //email
            if (language == "en") {
              var emailText =
                "You have been invited to accept and sign a transaction by " +
                resultrecord[0].applicationName +
                ". Your default activation code is " +
                activationCode;
                var UserName = "Hello " + name;
              var messages =
                "Hello " +
                name +
                ", You have been invited to accept and sign a transaction by " +
                resultrecord[0].applicationName +
                ". Your default activation code is " +
                activationCode +
                " Thanks VAMO ID";

              var message =
                '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' +
                UserName +
                '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' +
                emailText +
                '</td></tr><tr><td style="text-align:center;" ><img src="cid:qrcode" alt="qrcode" style="width:170px;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
              var subject = "Webslaud- Update your information with Vamo ID";
            } else {
              var emailText =
                "Has sido invitado a aceptar y firmar una transacción por parte de " +
                resultrecord[0].applicationName +
                ". Su contraseña predeterminada es " +
                activationCode;
                var UserName = "Hola " + name;
              var messages =
                "Hola " +
                name +
                ", Has sido invitado a aceptar y firmar una transacción por parte de " +
                resultrecord[0].applicationName +
                ". Su contraseña predeterminada es " +
                activationCode +
                " Thanks VAMO ID";

              var message =
                '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' +
                UserName +
                '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' +
                emailText +
                '</td></tr><tr><td style="text-align:center;" ><img src="cid:qrcode" alt="qrcode" style="width:170px;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
              var subject = "Webslaud- Actualiza tus datos con Vamo ID";
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
              attachments: [
                {
                  filename: imagename + ".png",
                  path: "./public/qrCode/" + imagename + ".png",
                  cid: "qrcode", //my mistake was putting "cid:logo@cid" here!
                },
              ],
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        }
      );
      var responseArr = [
        {
          status: 200,
          transactionID: generatedTransactionID,
          message: "Authentication request sent again Successfully",
        },
      ];

      result(null, responseArr);
      return;
    }
  );

  // browser detect

  // const { detect } = require("detect-browser");
  // const browser = detect();

  // // handle the case where we don't detect the browser
  // switch (browser && browser.name) {
  //   case "chrome":
  //     console.log("Chroome");
  //     break;
  //   case "firefox":
  //     console.log("firefox");
  //     break;

  //   case "edge":
  //     console.log("edge");
  //     break;

  //   case "opera":
  //     console.log("opera");
  //     break;

  //   default:
  //     console.log("not supported");
  // }
  //console.log("hello")
};
