const ResetPasswordModel = require("../models/ResetPasswordModel");
const bcrypt = require("bcryptjs");

exports.userResetPassword = (req,res) => {
  
  ResetPasswordModel.ResetPassword(req,(err, data) => {
    if (err)
     return res.status(500).send({
        success: "false",
        message: err.message || "error",
      });
      if (err)
      return res.status(401).send({
        success: "false",
        message: err.message || 'Please Enter Correct UserName Or Password!'
      })
    else
    return  res.status(200).send({
        success: "true",
        data: data,
      });

      
      
  });
  // if (!req.body.password && req.body.password == null) {
  //   return res.status(400).send({
  //     success: "false",
  //     msg: "password is empty!",
  //   });
  // }

 

 
  
}
