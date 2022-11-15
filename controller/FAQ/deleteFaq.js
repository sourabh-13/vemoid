const DeleteFaqModel = require("../../models/FAQ/DeleteFaqModel");

exports.deletefaq = (req,res) => {
 var id = req.body.id;
 console.log(id);
  DeleteFaqModel.Deletefaq(req,(err, data) => {
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
