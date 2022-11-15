const getAdminApplication = require('../../models/ManageAdmin/GetAdminApplicationModel')

exports.getAdminapp = (req,res)=>{
    getAdminApplication.GetAdminApp(req,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                data:data,
            })
        }
    })
}