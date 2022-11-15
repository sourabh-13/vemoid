const ManageRequestVerificationModel = require("../../models/verification/ManageSendDocuments");

exports.ManageSendDocuments = (req, res) => {
   ManageRequestVerificationModel.SendDocumentsVerification(req,(err, data) => {
    console.log("error", err);
    if (err)
      res.status(500).send({
        success: "true",
        message: err.message || "error",
      });
    else
      res.status(200).send({
        success: "true",
        message: "Solicitud enviada",
        //data: data,
      });
    });
};

exports.ManageGetDocuments = (req, res) => { 
     ManageRequestVerificationModel.GetDocumentsVerification(req,(err, data) => {
         console.log("error", err);
         if (err)
           res.status(500).send({
             success: "true",
             message: err.message || "error",
           });
         else
           res.status(200).send({
             success: "true",
             data: data,
           });
     });
 };