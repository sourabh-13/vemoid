const sql = require("../../../config/dbConnection");

exports.CreateApplication = (req, result) => {
  sql.query(
    'SELECT * FROM tbl_application_list WHERE application_name = "'+req.body.application_name+'"',
    (err, res) => {
      if (err) {
        console.log("testing");
        result(err, null);
        return;
      }
      if (res.length > 0) {
        const arr = {
          message: "Please Choose Other Name",
        };
        result(err,arr)
        return;
      }

       else {
        sql.query(
          `INSERT INTO tbl_application_list (user_id,application_name,applicationID,publicKey,privateKey,secretID)
    VALUES('${req.body.user_id}','${req.body.application_name}', '${req.body.applicationID}', '${req.body.publicKey}', '${req.body.privateKey}', '${req.body.secretID}');`,
          (error, resNext) => {
            if (error) {
              console.log("Error");
              result(error, null);
              return;
            }
          }
        );
      }
      result(null, res);
      return;
    }
  );
};
