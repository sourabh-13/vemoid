const sql = require("../../config/dbConnection")
const CryptoJS = require('crypto-js')

exports.AddMerchants = (request,result)=>{
  const host = request.host
  const port = 5000
  const filePath = request.protocol + "://" + host + ':' + port + '/image/' + request.file.filename;
  sql.query('SELECT * FROM tbl_users WHERE email="'+request.body.email+'"',(err,res)=>{
    if (err){
      //console.log("testing")
      result(err, null);
      return;

    }
    if(res.length > 0){
      //console.log('Email Already exist')
      result(err,null)
      return;
    }
    else{
      var encryptPassowrd = CryptoJS.MD5(request.body.password)

      sql.query(`INSERT INTO tbl_users  (registartion_number,country, email, company_name , address, phone_number, password,user_type,parentID,name,company_image)
    VALUES ('${request.body.registartion_number}','${request.body.country}','${request.body.email}','${request.body.company_name}','${request.body.address}','${request.body.phone_number}','${encryptPassowrd}', '${request.body.user_type}', '${request.body.user_id}', '${request.body.name}', '${filePath}');`,(error,nextres)=>{
      if (error) {
        //console.log("testing")
        result(error, null);
        return;
      }
        
    });
  }

    result(null,res)
    return;
  })
}
  







    
