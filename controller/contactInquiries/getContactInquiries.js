const GetContactInquiryModel = require("../../models/contactInquiries/GetContactInquiriesModel");

exports.getinquirieslist = (req,res) => {
  GetContactInquiryModel.GetInquiry(req,(err, data) => {
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