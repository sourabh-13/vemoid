const sql = require("../../config/dbConnection");
exports.SendNotification=(request,result)=>{
    

    sql.query(`INSERT INTO tbl_notifications  (user_id,subject,message,user_type)
    VALUES ('${request.body.userid}','${request.body.subject}', '${request.body.message}','${request.body.user_type}');`,(err,res)=>{
      if (err) {
        console.log("testing")
        result(err, null);
        return;
      }
       // console.log(res.insertId);

        let whereIN = '';
        if(request.body.user_type==4)
        {
          whereIN = '1,2,3';
        }
        else if(request.body.user_type==1)
        {
          whereIN = '1';
        }
        else if(request.body.user_type==2)
        {
          whereIN = '2';
        }
        else if(request.body.user_type==3)
        {
          whereIN = '3';
        }

        const latsInsertedID = res.insertId;
        // console.log(latsInsertedID)


       

        sql.query('SELECT id FROM tbl_users WHERE user_type IN ('+whereIN+')',(errNext,respNext)=>{

          respNext?.forEach(element => {
            //console.log(element['id']);
            sql.query(`INSERT INTO tbl_user_notification  (user_id,notifiction_id)
            VALUES ('${element['id']}','${latsInsertedID}');`,(inErr,inResp)=>{
              if(inErr){
                console.log('error')
              }
              if(inResp){
                console.log("success!")
              }
           
            });

          });


          });
        console.log(res)
        result(null,res);
        return;
    });   
  }