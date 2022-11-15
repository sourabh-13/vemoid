const MerchantModell = require("../models/AddMerchantModel");
exports.admindata=(req,res)=>{
  if (!req.body.registartion_number && req.body.registration_number == null) {
    return res.status(400).send({
      success: "false",
      msg: "registration field  is empty!",
    });
  }

 

  if (!req.body.password && req.body.password == null) {
    return res.status(400).send({
      success: "false",
      msg: "password   is empty!",
    });
  }

    MerchantModell.Merchants(req,(err,data)=>{
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