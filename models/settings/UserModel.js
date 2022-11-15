  const sql = require("../../config/dbConnection");
  
  exports.Users=(request,result)=>{
    const host = request.host;
    const port = 5000

    if(request.body.company_image){
      var sqls = 'UPDATE  tbl_users SET name ="'+request.body.name+'", phone_number = "'+request.body.phone+'", address = "'+request.body.address+'", gender = "'+request.body.gender+'", country = "'+request.body.country+'", state = "'+request.body.state+'", city = "'+request.body.city+'", postal = "'+request.body.postal+'" WHERE id = "'+request.body.id+'"'

    }
    else{
      const filePath = request.protocol + "://" + host + ':' + port + '/image/' + request.file.filename;
      var sqls = 'UPDATE  tbl_users SET name ="'+request.body.name+'", phone_number = "'+request.body.phone+'", address = "'+request.body.address+'", gender = "'+request.body.gender+'", country = "'+request.body.country+'", state = "'+request.body.state+'", city = "'+request.body.city+'", postal = "'+request.body.postal+'",company_image="'+filePath+'" WHERE id = "'+request.body.id+'"'
      

    }
    
    
    sql.query(sqls,(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
        result(null,res);
        return;
    });

    
  }
