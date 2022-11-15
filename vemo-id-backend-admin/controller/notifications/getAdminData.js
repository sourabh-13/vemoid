const GetAdminDataModel = require("../../../vemo-id-backend-admin/models/notifications/GetAdminDataModel");

exports.getadmindata = (req, res) => {
  GetAdminDataModel.GetAdmindata(req,(err, data) => {
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
