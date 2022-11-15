const DeleteInquiriesModel = require("../../models/contactInquiries/DeleteInquiriesModel");

exports.deleteinquiries = (req,res) => {
  DeleteInquiriesModel.Deleteinquiries(req,(err, data) => {
    if (err)
      res.status(500).send({
        success: "false",
        message: err.message || "error",
      });
    else
      res.status(200).send({
        success: "true",
        data: data,
      });
  });
};
