const sql = require("../../../config/dbConnection");

exports.appAuthenticationWithPasscode = (request, result) => {
  const enteredUserID = request.body.appUserID;
  const enteredApplicationID = request.body.applicationID;
  const enteredTransactionID = request.body.transactionID;
  const ipAddress = request.body.ipAddress;
  const browser = request.body.deviceName;
  
  var resultStatus = [];
  var resultGenTran = [];
  
  sql.query(
    'SELECT * FROM tbl_app_users_transactions WHERE id = "' +
      enteredTransactionID +
      '"',
    (err, res) => {
      if (err) {
        console.log("error");
        result(err, null);
        return;
      } else {
        res.forEach((e) => {
          var arr = {};
          arr["authStatus"] = e.auth_status;
          resultStatus.push(arr);
        });
        console.log(resultStatus)
        var returnvalue;
        if (res.length != 0) {
          if (resultStatus[0].authStatus > 0) {
            returnvalue = 0;
          } else {
            returnvalue = 1;
          }
        } else {
          returnvalue = 0;
        }
         console.log(returnvalue)
        if (returnvalue == 0) {
          const responseArr1 = [
            {
              status: 201,
              message: "Expired Request",
            },
          ];
          result(null, responseArr1);
          return;
        }else{
          console.log("ss")

          sql.query('SELECT * FROM tbl_app_users WHERE id = "'+enteredUserID+'" AND applicationID = "'+enteredApplicationID+'" ', (appusersErr,appUserRes)=>{
            if(appusersErr){
              console.log("Please Check Your Code")
              result(appusersErr,null)
              return
            }
           sql.query('SELECT a.*,b.application_name,b.applicationID,b.id AS APPUNIQUEID FROM tbl_app_users a  INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.applicationID = "'+request.body.applicationID+'" AND a.id = "'+request.body.id+'" ',(err1,res1)=>{
            if(err1){
              console.log('errorOne')
              result(err1,null)
              return;
            }
            // result(null,res1)
            // return;
            if(res1.length != 0){
              sql.query('UPDATE tbl_app_users SET appAuthenticationStatus = 1 WHERE id = "'+request.body.id+'" AND applicationID = "'+request.body.applicationID+'"',(updateErr,updateRes)=>{
                if(updateErr){
                  console.log("updateError")
                  result(updateErr,null)
                  return;
                }
                console.log("data updated")
                
                sql.query('UPDATE tbl_app_users_transactions SET auth_status=1,ipAddress="'+ipAddress+'",device_browser= "'+browser+'",updated_at=NOW() WHERE id="'+enteredTransactionID+'"',(errTransction,updateTransaction)=>{
                  if(errTransction){
                    console.log("Please Test Error!")
                    result(errTransction,null)
                    return;
                  }
                  console.log("Transaction Updated!")
                  sql.query('SELECT * FROM tbl_app_users_transactions WHERE id = "'+enteredTransactionID+'"',(getTranErr,getTranRes)=>{
                    if(getTranErr){
                      console.log("GetTransactionErr")
                      result(getTranErr,null)
                      return;
                    }
                    getTranRes.forEach((m)=>{
                      var getGenTransaction = {}
                      getGenTransaction['generatedTransaction'] = m.generatedTransactionId
                      resultGenTran.push(getGenTransaction)

                    })
                    // Callback URl Fuction pending


                    //Callback url Function pending
                    const responseArry = [{
                      status: 200,
                      message: 'Request authenticated successfully'
                    }]
                    result(null,responseArry)
                    return;
                  })
                })
              })

             
            }
            //Else Condition
            else{
              console.log("else")
              const responseArry = [{
                status: 201,
                message: 'Invalid Request'
              }]
              result(null,responseArry)
              return;
            }
            
           })
          })
        }




      }
    }
  );
};
