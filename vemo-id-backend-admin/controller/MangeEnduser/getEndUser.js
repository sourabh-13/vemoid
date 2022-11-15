const GetEndUserModel = require("../../../vemo-id-backend-admin/models/ManageEnduser/GetEndUserModel")

exports.getEnduserData = (req,res)=>{
    GetEndUserModel.GetEnduser(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                message: res.data || 'Collecting Data',
                data: data
            })
        }
    })
}