const { parse } = require("path");
const sql = require("../../../config/dbConnection");

exports.getTransactionById = (request, result) => {
  const applicationID = request.body.applicationID;
  const transactionID = request.body.transactionID;
  const resultrecord = [];
  const metaresultrecord = [];
  var meta = {}
  var arr = {};
  sql.query(
    'SELECT a.*, b.name,b.country,b.email,b.phone,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE a.generatedTransactionId = "' +
      transactionID +
      '" AND c.applicationID = "' +
      applicationID +
      '" ORDER BY a.updated_at DESC',
    (err, res) => {
      if (err) {
        console.log("Error");
        result(err, null);
        return;
      }
      if (res.length == 0) {
        const data = [
          {
            success: "false",
            message: "No record found",
          },
        ];
        result(null, data);
        return;
      }
      
      arr["user_id"] = res[0].user_id;
      arr["id"] = res[0].id;
      arr["name"] = res[0].name;
      arr["phone"] = res[0].phone;
      arr["email"] = res[0].email;
      arr["country"] = res[0].country;
      arr["createdDate"] = res[0].created_at;
      arr["applicationID"] = res[0].applicationID;
      arr["transactionID"] = res[0].generatedTransactionId;
      arr["auth_status"] = res[0].auth_status;
      arr["status"] = res[0].auth_status === 0 ? "Pending" : res[0].auth_status === 1 ? "APPROVED" :  res[0].auth_status === 6 ? "EXPIRED" : "REJECTED";
      arr["signatureDate"] = res[0].updated_at;
      arr["signatureDate"] = res[0].auth_status > 0 ? res[0].updated_at : "";
  sql.query(
    "Select md.meta_key AS mkey, mv.meta_value AS value FROM tbl_meta_values mv INNER JOIN tbl_meta_data md ON md.id = mv.metaID WHERE appUserID='"+res[0].user_id+"' AND transactionID='"+res[0].id+"'",
    (errm, resm) => {
      if (errm) {
        console.log("Errormetadata");
        result(errm, null);
        return;
      }
        resm.forEach((m) => {
          var marr = {};
          marr["key"] = m.mkey,
          marr["value"] = m.value
          resultrecord.push(marr);
        });
        arr['metadata'] =JSON.parse(JSON.stringify(resultrecord))
        metaresultrecord.push(arr)
        result(null,metaresultrecord);
        return;
      
    }
  );
    }
  );
};
