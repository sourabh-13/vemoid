const sql = require("../../../config/dbConnection");

exports.UpdateUserProfile = (request, result) => {
  const appUserID = request.body.appUserID
  sql.query(
    'SELECT a.*,b.id AS appID,b.appLogo,b.application_name,a.created_at AS issueAt,a.updated_at AS validatedAt,a.id AS appUserID,a.name,a.email,a.phone,a.profile_image AS userProfileImage FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.id = "' +
      appUserID+
      '"',
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      
      if (res.length != 0) {
        sql.query(
          "UPDATE tbl_app_users SET  profile_image = '" +
            request.file.path+
            "' WHERE id = '" +
            appUserID+
            "'",
          (errProfile, resProfile) => {
            if (errProfile) {
              result(errProfile, null);
              return;
            } else {
              result(null, resProfile);
              return;
            }
          }
        );
      }

      else {
        const resArr = {
          success: "false",
          message: "Invalid Request",
        };
        result(null, resArr);
        return;
      }
    }
  );
};
