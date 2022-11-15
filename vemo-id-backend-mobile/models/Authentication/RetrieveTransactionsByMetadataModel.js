const sql = require("../../../config/dbConnection");
const moment = require("moment");
const date = require("date-and-time");
const Getmeta = require('../../Globalmetadata');
const { response } = require("express");
const { resolve } = require("path");

// const isValidDate = (val) => {
//     const value = date.format((new Date()),
//     'YYYY/MM/DD HH:mm:ss');

// };

function isValidDate(date) {
  var temp = date.split("-");
  var d = new Date(temp[2] + "-" + temp[0] + "-" + temp[1]);
  return (
    d &&
    d.getMonth() + 1 == temp[0] &&
    d.getDate() == Number(temp[1]) &&
    d.getFullYear() == Number(temp[2])
  );
}

//meta data
function getMetaData(appUserID,transactionId){
  const resultmeta = [];
  
  sql.query(
      "Select md.meta_key AS mkey, mv.meta_value AS value FROM tbl_meta_values mv INNER JOIN tbl_meta_data md ON md.id = mv.metaID WHERE appUserID='" +
      appUserID +
        "' AND transactionID='" +
        transactionId+
        "'",
      (errm, resm) => {
        if (errm) {
          //console.log("error in meta sql");
          result(errm, null);
          return;
        }
        //console.log(resm)
        resm.forEach((e)=>{
          var arrmeta = {}
          arrmeta['meta_key'] = e.mkey,
          arrmeta['meta_value'] = e.value
          resultmeta.push(arrmeta)
          
        })
       
       return JSON.parse(JSON.stringify(resultmeta));
        
      }
    );

    
}


//meta data


//meta data function for checking




// const getmetad = (appUserID,transactionID)=>{
//   getLedgerDetails(appUserID,transactionID,res,(err, row)=>{

//   })
// }



//meta data function for checking


exports.RetrieveTransactionByMetaData = (request, result) => {
  const applicationID = request.body.applicationID;
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;
  const results = request.body.results;
  const metadata = request.body.metadata;
  var checkStarDate = 0;
  var checkEndDate = 0;
  var getCount = 0;
  const data = [];
  const resultrecord = [];
  var metaTest = []
  var resmeta=""
  var conQuery = "";


  //function for metadata
  // var getLedgerDetails=function(appUserID,transactionId,res, callback) {
  //   var response = [];
  //   sql.query("Select md.meta_key AS mkey, mv.meta_value AS value FROM tbl_meta_values mv INNER JOIN tbl_meta_data md ON md.id = mv.metaID WHERE appUserID='" +
  //   appUserID +
  //     "' AND transactionID='" +
  //     transactionId+
  //     "'", function (err, result) {
  //       if (err) {
  //           callback(err, null);
  //       }
  //       else {
  //           if (result.length > 0) {
  //             result.forEach((e)=>{
  //               var arrmeta = {}
  //               arrmeta['meta_key'] = e.mkey,
  //               arrmeta['meta_value'] = e.value
  //               response.push(arrmeta)
                
  //             })
  //             // callback(null, JSON.stringify(response));
  //             return callback(null,response);
  //           }
  //           else {
  //             return callback(null, null);
  //           }
  //       }
  //   });
  // };

  //function for metadata
  if (startDate != "" && endDate == "") {
    var betweenDate = " AND tut.created_at>='" + startDate + "'";
  } else if (startDate == "" && endDate != "") {
    var betweenDate = " AND tut.created_at>='" + endDate + "'";
  } else if (startDate != "" && endDate != "") {
    var betweenDate =
      " AND tut.created_at BETWEEN '" + startDate + "' AND '" + endDate + "'";
  } else {
    var betweenDate = "";
  }

  if (results != "") {
    var limit = "LIMIT " + results + "";
  } else {
    var limit = "";
  }
  //metadata
  if (metadata != "" || metadata.length != 0) {
    metadata.forEach((element, i = 0) => {
      var j = i + 1;
      if (j == 1) {
        conQuery +=
          " AND ((tmd.meta_key='" +
          element.key +
          "' AND tmv.meta_value='" +
          JSON.stringify(element.value) +
          "' )";
      } else {
        conQuery +=
          " OR (tmd.meta_key='" +
          element.key +
          "' AND tmv.meta_value='" +
          JSON.stringify(element.value) +
          "' ) ";
      }
    });
  } else {
    conQuery = "";
  }
  if (conQuery != "") {
    conQuery += ")";
  }
var mda = {}
  sql.query(
    "SELECT tut.*,tpu.name,tpu.country,tpu.email,tpu.phone,tal.applicationID,tmd.meta_key,tmd.id AS metaID,tmv.id AS MetaValID,tmv.meta_value FROM tbl_app_users_transactions tut INNER JOIN tbl_app_users tpu ON tpu.id=tut.user_id INNER JOIN tbl_application_list tal ON tal.id=tut.appID INNER JOIN tbl_meta_data tmd ON tmd.applicationID=tal.id INNER JOIN tbl_meta_values tmv ON tmd.id=tmv.metaID WHERE  tal.applicationID='" +
      applicationID +
      "' AND tmv.transactionID=tut.id " +
      betweenDate +
      " " +
      conQuery +
      " ORDER BY tut.created_at DESC " +
      limit +
      "",
    (err, res) => {
      if (err) {
        //console.log("error in sql");
        result(err, null);
        return;
      } else {
        //console.log(res);
        if (res.length == 0) {
          const norecord = [
            {
              success: "false",
              message: "No record found",
            },
          ];
          result(null, norecord);
          return;
        }
        
         console.log(resultrecord)
        res.forEach((e,i) => {
          var arr = {};
          (arr["applicationID"] = e.applicationID),
            (arr["transactionID"] = e.transactionID),
            (arr["status"] =
              e.auth_status == 0
                ? "Pending"
                : e.auth_status == 1
                ? "APPROVED"
                : "REJECTED"),
            (arr["name"] = e.name),
            (arr["phone"] = e.phone),
            (arr["email"] = e.email),
            (arr["country"] = e.country),
            (arr["createdDate"] = e.createdDate),
            (arr["user_id"] = e.user_id),
            (arr["id"] = e.id),
            (arr["updated_at"] = e.updated_at),
            (arr["signatureDate"] = e.auth_status > 0 ? e.updated_at : ""),
            // (arr["metadata"] = getMetaData(e.user_id,e.id))
            //console.log("testing") 
            (arr["meta"] = {
              "metadata":Getmeta.Getmetadata(e.user_id,e.id)
             })            
           data.push(arr)
           
          
       });
       
       
      
       setTimeout(() => {

        result(null, data);
        return;
    }, 10000);
        
      
      
      }
    }
  );
  //sql
};


