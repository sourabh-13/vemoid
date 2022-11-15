const ManageAdminModel = require("../../models/ManageAdmin/ManageAdminModel");

exports.manageAdminList = (req, res) => {
  ManageAdminModel.ManageAdmins((err, data) => {
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
