const ManageAdminDetailsModel = require("../../models/ManageAdmin/ManageAdminDetailsModel");

exports.manageAdminDetails = (req, res) => {
  ManageAdminDetailsModel.ManageAdminDetails(req,(err, data) => {
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
