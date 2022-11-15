const ReadSubscriptionModel = require("../../models/subscriptionplan/ReadSubscriptionModel");

exports.readsubscription = (req,res) => {
  ReadSubscriptionModel.Readsubscription(req,(err, data) => {
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
