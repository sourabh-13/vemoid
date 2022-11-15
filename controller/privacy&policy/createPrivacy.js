const createprivacyAndPolicy = require("../../models/privacy&policy/CreatePrivacyModel");
exports.createprivacy=(req,res)=>{
 

  if (!req.body.heading && req.body.heading == null) {
    return res.status(400).send({
      success: "false",
      msg: "heading field  is empty!",
    });
  }

  if (!req.body.descriptions && req.body.descriptions == null) {
    return res.status(400).send({
      success: "false",
      msg: "description field  is empty!",
    });
  }
 

    createprivacyAndPolicy.Privacy(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message:
            err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        data:data
      });
    });
};