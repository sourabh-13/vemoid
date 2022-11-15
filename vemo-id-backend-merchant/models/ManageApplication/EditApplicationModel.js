const sql = require('../../../config/dbConnection');
const path = require('path')
const	busboy = require("then-busboy")
const multer = require('multer')
const	fileUpload = require('express-fileupload');
const mime = require('mime');
const fs = require('fs');

exports.EditApplication = (request,result)=>{
  const host = request.host
  const port = 5000
  
  sql.query('SELECT COUNT(id) AS totalCount FROM tbl_application_list',(err,resq)=>{
    if (err) {
     
      result(err, null);
      return;
    }
    
     if(resq[0].totalCount>0)
     {
      // sql.query(`UPDATE tbl_application_list SET application_name='${request.body.application_name}' , privacyPolicy = '${request.body.privacyPolicy}', tersmsOfUse = '${request.body.tersmsOfUse}',  description ='${request.body.description}', redirectUrl = '${request.body.redirectUrl}',sessionExpirationTime = '${request.body.sessionExpirationTime}', domainName = '${request.body.domainName}' WHERE id = '${request.body.id}' `,(err,res)=>{
       
      //   if (err) {
          
      //     result(err, null);
      //     return;
      //   }
      //     result(null,res);
      //     return;
      // });

        // var matches = request.body.appLogo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        // response = {};
          
        //   if (matches.length !== 3) {
        //   return new Error('Invalid input string');
        // }
        // response.type = matches[1];
        // response.data = new Buffer(matches[2], 'base64');
        // let decodedImg = response;
        // let imageBuffer = decodedImg.data;
        // let type = decodedImg.type;
        // let extension = mime.getExtension(type);
        // let fileName = request.body.id+"."+extension;
        // fs.writeFileSync("./public/uploads/" + fileName, imageBuffer, 'utf8');
        if(request.body.appLogo === ''){
          var sqls = `UPDATE tbl_application_list SET redirectUrl='${request.body.redirectUrl}', application_name='${request.body.application_name}' , privacyPolicy = '${request.body.privacyPolicy}', tersmsOfUse = '${request.body.tersmsOfUse}',  description ='${request.body.description}', sessionExpirationTime='${request.body.sessionExpirationTime}', domainName='${request.body.domainName}' WHERE id = '${request.body.id}' `

        }
        else{
          const filePath = request.protocol + "://" + host + ':' + port + '/image/' + request.file.filename;
          var sqls = `UPDATE tbl_application_list SET redirectUrl='${request.body.redirectUrl}', application_name='${request.body.application_name}' , privacyPolicy = '${request.body.privacyPolicy}', tersmsOfUse = '${request.body.tersmsOfUse}',  description ='${request.body.description}', sessionExpirationTime='${request.body.sessionExpirationTime}', domainName='${request.body.domainName}', appLogo='${filePath}' WHERE id = '${request.body.id}' `

        }

        sql.query(sqls,(err,res)=>{
        
          if (err) {
            
            result(err, null);
            return;
          }
            result(null,res);
            return;
        });
     }
     else
     {
      sql.query(`INSERT INTO tbl_application_list  (application_name,privacyPolicy,tersmsOfUse,description,redirectUrl,sessionExpirationTime,domainName,appLogo)
      VALUE ('${request.body.application_name}', '${request.body.privacyPolicy}', '${request.body.tersmsOfUse}', '${request.body.description}'), '${request.body.redirectUrl}', '${request.body.sessionExpirationTime}', '${request.body.domainName}','${request.body.appLogo}';`,(err,res)=>{
        if (err) {
          //console.log("testing3")
          result(err, null);
          return;
        }
          result(null,res);
          return;
      });
     }
   
    
  });

    
  }