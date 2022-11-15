const GetSubscriptionModel = require("../../models/subscriptionplan/GetSubscriptionModel");

exports.getsubscription = (req,res) => {
  GetSubscriptionModel.GetSubscriptions((err, data) => {
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
