const GetContactDetailsModel = require("../../models/contactdetails/GetContactDetailsModel");

exports.getcontact = (req,res) => {
  GetContactDetailsModel.Getcontactdetails((err, data) => {
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
