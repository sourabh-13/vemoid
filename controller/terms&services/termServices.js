const CreateTermServices = require("../../models/terms&services/TermsModel");
exports.createterms=(req,res)=>{
 

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

    CreateTermServices.Terms(req,(err,data)=>{
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