const forgotpasswordmodel = require("../models/ForgotPasswordModel");
exports.forgetpassword = (req,res)=>{
  if (!req.body.email && req.body.email==null) {
    return res.status(400).send({
        success:'false',
        message: 'Please Provide Email'
        });
}
    forgotpasswordmodel.ForgetPassword(req,(err, data) => {
        if (err)
         return res.status(500).send({
            success: "false",
            message: err.message || "error",
          });
        else
        return  res.status(200).send({
            success: "true",
            data: data,
          });
        });
    
}