const retrieveTransactionByEmailModel = require("../../../vemo-id-backend-mobile/models/Authentication/RetrieveTransactionByEmailModel");

exports.retrieveTransactionByEmail = (req, res) => {
  if (!req.body.email && req.body.email == null) {
    return res.status(400).send({
      success: "false",
      message: "Please Provide Email",
    });
  }
  if (!req.body.applicationID && req.body.applicationID == null) {
    return res.status(400).send({
      success: "false",
      message: "Please Provide ApplicationID",
    });
  }
  if (!req.body.results && req.body.results == null) {
    return res.status(400).send({
      success: "false",
      message: "Please Provide results",
    });
  }
  if (!req.body.startDate && req.body.startDate == null) {
    return res.status(400).send({
      success: "false",
      message: "Please Provide Start Date",
    });
  }
  if (!req.body.endDate && req.body.endDate == null) {
    return res.status(400).send({
      success: "false",
      message: "Please Provide End Date",
    });
  }
  retrieveTransactionByEmailModel.RetrieveTransactionsByEmail(
    req,
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err.message || "error",
        });
      } else {
        res.status(200).send({
          success: "true",
          data: data,
        });
      }
    }
  );
};
