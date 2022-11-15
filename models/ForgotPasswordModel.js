const sql = require("../config/dbConnection")
const nodemailer = require('nodemailer')

exports.ForgetPassword = (request,result)=>{
    sql.query('SELECT email FROM tbl_users WHERE email="'+request.body.email+'"',(err,res)=>{
        if(err){
            console.log(res)
            result(err,null)
            return;
        }
       
        if(res.length != 0){
           
                var emailText = "Please click link below"
      
                    var message =
                      '<html><body style="font-family: "Poppins", sans-serif;"><div class="flyer-detail-main-area" style="width:80%; margin:auto;"><div class="flyer-table-main-area"><div class="flyer-img-main-area" style="text-align: center; padding: 15px 0px 15px 0px;"><img src="https://vamo.id/backend-server/assets/images/logo-4.png" style="width:17%;"></div><table style="width:100%; border-top: 2px solid #ff0f60; margin:0px 0px 0px 0px; padding: 0px 0px 15px 15px;"><tr><th></th><th></th><th></th></tr><tr style="padding:20px 0px 0px 0px; display: block;"><td style="font-size:16px;">' 
                      '</td></tr><tr style="padding:30px 0px 0px 0px; display: block;"><td style="font-size:16px; line-height:30px;">' +
                      emailText +
                      '</td></tr><tr><td style="text-align:center;" ><img src="cid:qrcode" alt="qrcode" style="width:170px;"></td></tr><tr><td style="background: #f2f2f2; padding: 10px 0px 20px 0px;"><p style="text-decoration: none; text-align:center; font-size: 12px; color:#817c7c; font-weight:600; padding: 0px;">VAMO ID © 2022</p><p style="text-align: center; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><a href="#" target="_blank" style="text-decoration: none; font-size: 12px; color:#817c7c; font-weight:600;">Powered By VAMO ID</a></p></td></tr></table></div></div></body></html>';
                    var subject = "Webslaud- Update your password with Vamo ID";
                  
      
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
                    to: request.body.email,
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
                  //console.log(token)
                  const resArr = {
                    status: 200,
                    message: "Email sent Successfully"
                  }

                  result(null,resArr)
                  return;
                
        }
        else{
            const resArr = {
                status:400,
                message:"Please Provide Correct Email"
            }
            result(null,resArr)
            return;
        }
    })


}