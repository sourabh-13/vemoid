const updateStatusModel = require('../../models/ManageAdmin/UpdateStatusModel')

exports.updateStatus = (req,res)=>{
    updateStatusModel.ChangeStatus(req,(err,data)=>{
      if (err)
        res.status(500).send({
          success: 'false',
          message: err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        message: res.message || 'Status Updated Successfully!',
        data:data
      });
    })

}