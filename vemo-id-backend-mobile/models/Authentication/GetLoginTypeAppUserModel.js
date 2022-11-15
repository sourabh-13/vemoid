const sql = require("../../../config/dbConnection");

exports.getLoginTypeAppUser = (request, result) => {
  const appUserID = request.body.appUserID;
  const applicationID = request.body.applicationID;

  sql.query(
    'SELECT b.id AS appID,b.application_name, a.id AS appUserID, a.name, a.email, a.phone,a.appUserSetLoginType FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.id = "' +
      appUserID +
      '" AND b.applicationID = "' +
      applicationID +
      '"',
    (err, res) => {
      if (err) {
        console.log("testing!");
        result(err, null);
        return;
      }

      if (res.length > 0) 
      {
        result(null, res[0]);
        return;
      } 
      else 
      {
        const norec =  {
          status:201,
          message: "Invalid Request"
        }    
        result(norec,null)
        return;
      }
    }
  );
};
