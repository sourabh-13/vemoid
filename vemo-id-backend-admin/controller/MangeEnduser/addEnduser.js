const AddEndUserModel = require("../../../vemo-id-backend-admin/models/ManageEnduser/AddEnduserModel")

exports.addEnduser = (req,res)=>{
    AddEndUserModel.AddEndUser(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.message || 'Inserted Data Successfully',
                data: data
            })
        }
    })
}