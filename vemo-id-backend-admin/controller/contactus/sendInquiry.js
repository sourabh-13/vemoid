const SendInquiryModel = require("../../models/contactus/SendInquiryModel")

exports.sendinquiry = (req,res)=>{
    SendInquiryModel.Sendenquiry(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message:
            err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        data:data
      });
    });
}