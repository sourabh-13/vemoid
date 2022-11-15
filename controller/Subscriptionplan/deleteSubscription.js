const DeleteSubscriptionModel = require("../../models/subscriptionplan/DeleteSubscriptionModel");

exports.deletesubscription = (req,res) => {
 var id = req.body.id;
 console.log(id);
  DeleteSubscriptionModel.Deletesubscriprion(req,(err, data) => {
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
