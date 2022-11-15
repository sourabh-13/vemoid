const sql = require('../../config/dbConnection');
const mime = require('mime');
const fs = require('fs');

exports.GetDocuments = (request,result)=>{
    console.log("cecilio", request.body);

    var matches = request.body.document.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};
      
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = request.body.phone+"-"+Date.now()+"."+extension;
    fs.writeFileSync("./public/uploads/" + fileName, imageBuffer, 'utf8');

    const norec = {
        status: 200,
        success: "true",
        message: "received document"
    }
    result(norec, null)

/*     sql.query('SELECT * FROM tbl_terms_services', function(err, rows) {
        
 
        if (err) {
            console.log("testing")
            result(err, null);
            return;
          }


          result(null,rows);
          return;
        
    }); */
    
}