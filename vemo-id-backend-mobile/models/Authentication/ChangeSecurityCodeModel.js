const sql = require("../../../config/dbConnection");
var nodemailer = require("nodemailer");

exports.ChangeSecurityCode = (request, result) => {
  const deviceToken = request.body.deviceToken;
  const code = request.body.oldcode;
  const newcode = request.body.newcode;
  const email = request.body.email;
  const resultrecord = [];
  let date_ob = new Date();
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  const otp = hours + "" + minutes + "" + seconds;
  console.log(otp);

  sql.query(
    'SELECT b.id AS appID,b.application_name, b.appLogo,a.created_at,a.id AS appUserID,a.name,a.email,a.phone FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.deviceToken = "' +
      deviceToken +
      '" AND a.mobileSecurityCode = "' +
      code +
      '" ORDER BY b.application_name ASC',
    (err, res) => {
      if (err) {
        console.log("error");
        result(err, null);
        return;
      }
      res.forEach((e) => {
        var arr = {};
        arr["name"] = e.name;
        arr["email"] = e.email;
        resultrecord.push(arr);
      });
      if (res.length == 0) {
        const norec = [
          {
            success: "false",
            message: "Invalid old security code or device token",
          },
        ];
        result(null, norec);
        return;
      } else {
        console.log(res);
        sql.query(
          'UPDATE tbl_app_users SET mobileSecurityNewCodeCode = "' +
            newcode +
            '", mobileSecurityCodeStatus = 1, mobileSecurityCodeOtp = "' +
            otp +
            '"   WHERE deviceToken = "' +
            deviceToken +
            '" AND mobileSecurityCode = "' +
            code +
            '"',
          (errUpdate, resUpdate) => {
            if (errUpdate) {
              console.log("update error");
              console.log(errUpdate);
              result(errUpdate, null);
              return;
            } else {
              console.log(resUpdate);
            }
          }
        );
        //send email
        var emailText ="Your security code change OTP from VamoId is "+otp;                            
        var UserName = "Hello " + resultrecord[0].name; 
        var message ='<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">'+UserName+'</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">'+emailText+'</td></tr><tr><td style="text-align: center; margin: 40px 0px 40px 0px; display: block;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
        var subject="Vemo-ID security code OTP";
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
          to: resultrecord[0].email,
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

        //send email

        const responseArr = {
          status: 200,
          message: "security code Change otp sent you successfully",
        };

        result(null, responseArr);
        return;
      }
    }
  );
};
