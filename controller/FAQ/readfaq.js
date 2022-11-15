const ReadFaqModel = require("../../models/FAQ/ReadFaqModel");

exports.readfaq = (req, res) => {
  ReadFaqModel.Readfaq((err, data) => {
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
