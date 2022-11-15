const GetAdminSendDataModel = require("../../../vemo-id-backend-admin/models/notifications/GetAdminSendNotificationModel");

exports.getadminsenddata = (req, res) => {
  GetAdminSendDataModel.GetAdminSenddata(req,(err, data) => {
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
