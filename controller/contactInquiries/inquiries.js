const ContactInquiryModel = require("../../models/contactInquiries/InquiriesModel");

exports.inquirieslist = (req,res) => {
  ContactInquiryModel.Inquiry((err, data) => {
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