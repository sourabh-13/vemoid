const sql = require("../config/dbConnection");
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
//var md5Hash = CryptoJS.MD5("Kumar@123456");
//console.log(md5Hash);
 
exports.ResetPassword = (req,result) => {
 var password = req.body.password
 var id = req.body.id 
 var salt = bcrypt.genSaltSync(10);
 var newpassword = req.body.newpassword
 var encryptPassowrd = CryptoJS.MD5(password);
 
  
 sql.query('SELECT * FROM tbl_users WHERE password ="' + encryptPassowrd + '" AND id ="'+id+'"', function(err, resp) {
  if (err){
    //console.log('testing')
    result(err,null)
    return;
  }
  if (resp.length > 0) {
    var encryptNewPass =  CryptoJS.MD5(newpassword); 
    sql.query('UPDATE tbl_users SET password = "'+encryptNewPass+'"  WHERE id ="'+req.body.id+'"',function(errNext,respNext) {
      
      if (errNext){
        //console.log('testing')
        result(errNext,null)
        return;
      }
     
      //console.log('password changed successfully');
      result(null,respNext)
      return;
  });  
  
   }
   else{
    console.log("Please Enter Correct Password!")
   } 
  
})


  


 
}

   


  
         


























//password: $2a$04$f5T.ssuKgJWY2sq.BP44tu.Ljp.owREhy00HQAmJZ60poFScp3EPe


    // var id = req.body.id;
    // var password = req.body.password;
    // var email = req.body.email;
    // sql.query('SELECT * FROM tbl_users WHERE id ="' + id + '"', (err, result)=> {
    // if (err) throw err;
    // var type
    // var msg
    // if (result.length > 0) {
    // var saltRounds = 6;
    // var hash = bcrypt.hash(password, saltRounds);
    // bcrypt.genSalt(saltRounds, (err, salt)=> {
    // bcrypt.hash(password, salt,(err, hash)=> {
    // // var data = {
    // // password: hash
    // // }
    // sql.query('UPDATE tbl_users SET password = "'+req.body.password+'", WHERE id = "' + id + '"', hash, (err, result)=> {
    // if(err) throw err
    // });
    // });
    // });
    // type = 'success';
    // msg = 'Your password has been updated successfully';
    // } else {
    // console.log('2');
    // type = 'success';
    // msg = 'Invalid Password, Please enter correct password';
    // }
   
  
    // });

  
    



    //https://www.codegrepper.com/code-examples/javascript/match+password+and+confirm+password+in+javascript+if+true+then+submit+form


//     function onChange() {
//   const password = document.querySelector('input[name=password]');
//   const confirm = document.querySelector('input[name=confirm]');
//   if (confirm.value === password.value) {
//     confirm.setCustomValidity('');
//   } else {
//     confirm.setCustomValidity('Passwords do not match');
//   }
// }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //password = $2a$04$f5T.ssuKgJWY2sq.BP44tu.Ljp.owREhy00HQAmJZ60poFScp3EPe
 














































  // const saltRounds = 10;
  // var password = req.body.password;
  
  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //   bcrypt.hash(password, salt, function(err, hash) {
              
  //    });
  // });
  
  // bcrypt.compare(req.body.password, password, ['password'], (bErr, bResult)=>{
  //   if(bErr){
  //     console.log("err")
  //   }
  //   if(bResult){
  //     console.log("success!")
  //   }
  // })