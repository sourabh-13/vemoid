const sql = require("../../../config/dbConnection");
const getMeta = require('../../Globalmetadata')

exports.RetrieveTransactionsByDocumentTypeNumber = (request, result) => {
  const applicationID = request.body.applicationID;
  const country = request.body.country;
  const documentType = request.body.documentType;
  const documentNumber = request.body.documentNumber;

  const results = request.body.results;
  const data = [];
  const metadata3 = {};
 
  const metaresultrecord = [];
  const resultrecord = [];
  const ar = [];

  if (results != "") {
    sql.query(
      'SELECT a.*, b.name,b.country,b.email,b.phone,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE c.applicationID = "' +
        applicationID +
        '" AND b.documentType = "' +
        documentType +
        '" AND b.documentNumber = "' +
        documentNumber +
        '" AND b.country = "' +
        country +
        '" ORDER BY a.updated_at DESC LIMIT ' +
        results +
        "",
      (err, res) => {
        if (err) {
          console.log("error");
          result(err, null);
          return;
        }
        console.log("res1");
        console.log(res);
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
        res.forEach((e) => {
          const arr1 = {};
          arr1["user_id"] = e.user_id;
          arr1["id"] = e.id;
          arr1["name"] = e.name;
          arr1["phone"] = e.phone;
          arr1["email"] = e.email;
          arr1["country"] = e.country;
          arr1["createdDate"] = e.created_at;
          arr1["applicationID"] = e.applicationID;
          arr1["transactionID"] = e.generatedTransactionId;
          arr1["auth_status"] = e.auth_status;
          arr1["status"] =
            e.auth_status === 0
              ? "Pending"
              : e.auth_status === 1
              ? "APPROVED"
              : "REJECTED";
          arr1["signatureDate"] = e.updated_at;
          arr1["signatureDate"] = e.auth_status > 0 ? e.updated_at : "";
          arr1["meta"] = {'metadata':getMeta.Getmetadata(e.user_id,e.id)}

          metaresultrecord.push(arr1);
        });
        setTimeout(()=>{
          result(null, metaresultrecord);
          return;
  
        },10000)
       
        //testtt
      }
    );
    //testttt
  } else {
    sql.query(
      'SELECT a.*, b.name,b.country,b.email,b.phone,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE c.applicationID = "' +
        applicationID +
        '" AND b.documentType = "' +
        documentType +
        '" AND b.documentNumber = "' +
        documentNumber +
        '" AND b.country = "' +
        country +
        '" ',
      (elErr, elRes) => {
        if (elErr) {
          console.log("else Error!");
          result(elErr, null);
          return;
        } else {
          if (elRes.length == 0) {
            const data = [
              {
                success: "false",
                message: "No record found",
              },
            ];
            result(null, data);
            return;
          }
          elRes.forEach((m) => {
            const arr = {};
            arr["user_id"] = m.user_id;
            arr["id"] = m.id;
            arr["name"] = m.name;
            arr["phone"] = m.phone;
            arr["email"] = m.email;
            arr["country"] = m.country;
            arr["createdDate"] = m.created_at;
            arr["applicationID"] = m.applicationID;
            arr["transactionID"] = m.generatedTransactionId;
            arr["auth_status"] = m.auth_status;
            arr["status"] =
              m.auth_status === 0
                ? "Pending"
                : m.auth_status === 1
                ? "APPROVED"
                : "REJECTED";
            arr["signatureDate"] = m.updated_at;
            arr["signatureDate"] = m.auth_status > 0 ? m.updated_at : "";
            arr["meta"]= {"metadata": getMeta.Getmetadata(m.user_id,m.id)}
           
            metaresultrecord.push(arr);  

           
          });

         
          setTimeout(()=>{
            result(null,metaresultrecord)
            return;
          },10000)
        }
        
      }
    );
  }
};
