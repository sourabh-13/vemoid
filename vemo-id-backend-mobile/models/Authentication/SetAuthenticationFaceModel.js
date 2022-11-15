const e = require("express");
const sql = require("../../../config/dbConnection");

exports.setAuthenticationWithFaceBiometric = (request, result) => {
  const resultrecord = [];
  const type = request.body.type;
  const deviceUniqueNumber = request.body.deviceUniqueNumber;
  const appUserID = request.body.appUserID;
  const applicationID = request.body.applicationID;
  const code = request.body.code;

  var ipAddress = request.body.ipAddress; 
  if (!request.body.ipAddress && request.body.ipAddress==null) 
  {
    ipAddress = "192.168.1.109"; 
  }

  sql.query(
    'SELECT * FROM tbl_app_users WHERE id = "' +  request.body.appUserID + '" AND applicationID = "' + applicationID +'"',  (err, res) => {

      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      if (res.length > 0) 
      {

        if(res[0]['appAuthenticationStatus']===1)
        {
          var updateAppUser = "";
          if(type===1)
          {
            updateAppUser = "appFaceAuthentication=1";
          }
          if(type===2)
          {
            updateAppUser = "appThumbAuthentication=1";
          }
          if(type===3)
          {
            if(!request.body.code && request.body.code==null)
            {
              const norec =  {
                  success:"false",
                  message: "Please Provide code"
                }    
              result(norec,null)
              return;
            }
            if(request.body.code==res[0]['mobileSecurityCode'])
            {
              updateAppUser = "appCodeAuthentication=1";
            }
            else
            {
              const norec =  {
                status:201,
                message: "Inavlid entered code"
              }    
              result(norec,null)
              return;
            }
          }
           sql.query("UPDATE tbl_app_users SET "+updateAppUser+" WHERE applicationID='"+applicationID+"' AND id='"+res[0]['id']+"'",  (err, res) => {});
          const successMessage = {
                                  status:200,
                                  message:'Authenticated successfully',
                                }

          result(successMessage,null)
          return;


        }
        else
        {
          const norec =  {
            status:201,
            message: "You are not signed in"
          }    
          result(norec,null)
          return;

        }
        
      }
      else
      {
        const norec =  {
          status:201,
          message: "Invalid login details"
        }    
        result(norec,null)
        return;
      }

      result(null, res);
      return;
    }
  );
};
