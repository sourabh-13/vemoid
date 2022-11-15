const GetPrivacyModel = require("../../models/privacy&policy/GetPrivacyModel");

exports.getprivacy = (req,res) => {
  GetPrivacyModel.GetPrivacy((err, data) => {
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
