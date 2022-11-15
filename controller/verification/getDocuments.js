const ManageRequestVerificationModel = require("../../models/verification/GetDocuments");

exports.ManageDocuments = (req, res) => {
   ManageRequestVerificationModel.GetDocuments(req,(err, data) => {
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
