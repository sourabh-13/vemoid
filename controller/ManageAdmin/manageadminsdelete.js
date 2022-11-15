const ManageAdminsDeleteModel = require('../../models/ManageAdmin/ManageAdminsDeleteModel');

exports.manageAdminDelete = (req, res) => {
    ManageAdminsDeleteModel.ManageAdminsDelete(req,(err, data) => {
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
  