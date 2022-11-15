const sql = require("../../../config/dbConnection");
const moment = require('moment')
const metadata=require('../../Globalmetadata')


exports.RetrieveTransactionsByEmail = (request, result) => {
  const applicationID = request.body.applicationID;
  const email = request.body.email;
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;
  const results = request.body.results;
  const keyArr = [];
  const dataArr = [];
  const data = [];

  var checkStarDate = 0;
  var checkEndDate = 0;

//   console.log(isValidDate('02-28-2015'))

if (startDate != "" && endDate == "") {
    var betweenDate = " AND a.created_at>='" + startDate + "'";
  } else if (startDate == "" && endDate != "") {
    var betweenDate = " AND a.created_at>='" + endDate + "'";
  } else if (startDate != "" && endDate != "") {
    var betweenDate =
      " AND a.created_at BETWEEN '" + startDate + "' AND '" + endDate + "'";
  } else {
    var betweenDate = "";
  }

  if (results != "") {
    var limit = "LIMIT " + results + "";
  } else {
    var limit = "";
  }
  //metadata
  
//   if(results != 0){
    // if(checkStarDate == 1 && checkEndDate == 0){
    sql.query(
      'SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "' +
        email +
        '" AND c.applicationID = "' +
        applicationID +
        '" '+betweenDate+'  ORDER BY a.updated_at DESC '+limit+'',
      (err, res) => {
        if (err) {
          console.log("error Checking");
          result(err, null);
          return;
        }
        if (res.length == 0) {
          const norec = [
            {
              message: "No record found",
            },
          ];
          result(null, norec);
          return;
        } else {
          res.forEach(element => {
            var arr = {}
            arr['applicationID']=element.applicationID,
            arr['transactionID']=element.generatedTransactionId,
            arr['status']=element.auth_status==0?'Pending':element.auth_status==1?'APPROVED':'REJECTED',
            arr['name']=element.name,
            arr['phone']=element.phone,
            arr['email']=element.email,
            arr['country']=element.country,
            arr['createdDate']=element.createdDate,
            arr['signatureDate']=element.auth_status!=0?element.updated_at:'',
            arr['metadata']={
              'meta':metadata.Getmetadata(element.user_id,element.id)
            }
            data.push(arr)
          });
          setTimeout(()=>{
            result(null, data);
            return;
          },10000)
          
          
        }
      }
    );
// }

}












// else if(checkStarDate==0 && checkEndDate==1){
//     sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'" AND a.created_at = "'+startDate+'" ORDER BY a.updated_at DESC LIMIT '+results+'',(err2,res)=>{
//         if(err2){
//             console.log("err2")
//             result(err2,null)
//             return;
//         }
//         if(res.length < 1){
//             const norec = [{
//                 message: "No record found"
//             }] 
//             result(null,norec)
//             return;
//           }
//         else{
//             result(null,res)
//             return;
//         }
//     })
// }
// else if(checkStarDate == 1 && checkEndDate ==1){
//     sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'" AND a.created_at >= "'+startDate+'" AND a.created_at <= "'+endDate+'" ORDER BY a.updated_at DESC LIMIT '+results+'',(err3,res)=>{
//         if(err3){
//             console.log("err3777")
//             result(err3,null)
//             return;
//         }
//         // res.forEach((e)=>{
//         //     var arr = {}
//         //     arr['name'] = e.name
//         //     data.push(arr)
//         // })
//         if(res.length < 1){
//             const norec = [{
//                 message: "No record found"
//             }] 
//             result(null,norec)
//             return;
//           }
//         else{
//             result(null,data)
//             return;
//         }
//     })

// }
// else{
//     sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'" ORDER BY a.updated_at DESC LIMIT '+results+'',(err4,res)=>{
//         if(err4){
//             console.log("err4")
//             result(err4,null)
//             return;
//         }
//         if(res.length < 1){
//             const norec = [{
//                 message: "No record found"
//             }] 
//             result(null,norec)
//             return;
//           }
//         else{
//             result(null,res)
//             return;
//         }
//     })
    
// }

//   }
//   else{
//     if(checkStarDate==1 && checkEndDate==0){
//         sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'" AND a.created_at = "'+startDate+'" ORDER BY a.updated_at DESC',(err1,res)=>{
//             if(err1){
//                 console.log("err1")
//                 result(err1,null)
//                 return;
//             }
//             // if(res.length < 1){
//             //     const norec = [{
//             //         message: "No record found"
//             //     }] 
//             //     result(null,norec)
//             //     return;
//             //   }
//             else{
//                 result(null,res)
//                 return;
//             }
//         })

//     }
//     else if(checkStarDate==0 && checkEndDate==1){
//         sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'" AND a.created_at = "'+endDate+'" ORDER BY a.updated_at DESC',(err1,res)=>{
//             if(err1){
//                 console.log("err1")
//                 result(err1,null)
//                 return;
//             }
//             if(res.length < 1){
//                 const norec = [{
//                     message: "No record found"
//                 }] 
//                 result(null,norec)
//                 return;
//               }
//             else{
//                 result(null,res)
//                 return;
//             }
//         })
        
//     }
//     else if(checkStarDate==1 && checkEndDate==1){
//         sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'" AND a.created_at = "'+startDate+'" AND a.created_at = "'+endDate+'" ORDER BY a.updated_at DESC LIMIT '+results+'',(err2,res)=>{
//             if(err2){
//                 console.log("err2")
//                 result(err2,null)
//                 return;
//             }
//             if(res.length < 1){
//                 const norec = [{
//                     message: "No record found"
//                 }] 
//                 result(null,norec)
//                 return;
//               }
//             else{
//                 result(null,res)
//                 return;
//             }
//         })


//     }
//     else{
//         sql.query('SELECT a.*,b.name,b.email,b.phone,b.country,c.applicationID FROM tbl_app_users_transactions a INNER JOIN tbl_app_users b ON b.id = a.user_id INNER JOIN tbl_application_list c ON c.id = a.appID WHERE b.email = "'+email+'" AND c.applicationID = "'+applicationID+'"  ORDER BY a.updated_at DESC',(err3,res)=>{
//             if(err3){
//                 console.log("err3111")
//                 result(err3,null)
//                 return;
//             }
//             if(res.length < 1){
//                 const norec = [{
//                     message: "No record found"
//                 }] 
//                 result(null,norec)
//                 return;
//               }
//             else{
//                 result(null,res)
//                 return;
//             }
//         })
//     }
//   }
  


// };
