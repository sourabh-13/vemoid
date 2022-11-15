const AddAdminModel = require("../../models/ManageAdmin/AddAdminModel");
exports.admindata=(req,res)=>{
  
    AddAdminModel.Admins(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message: err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        data:data
      });
    });
};