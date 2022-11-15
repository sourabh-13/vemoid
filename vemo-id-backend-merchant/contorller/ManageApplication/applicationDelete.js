const ApplicationDeleteModel = require('../../../vemo-id-backend-merchant/models/ManageApplication/ApplicationDeleteModel')

exports.applicationDelete = (req,res)=>{
    ApplicationDeleteModel.ApplicationDelete(req,(err,data)=>{

        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        
        else{

            res.status(200).send({
                success:'true',
                data: data,
            })
        }
    })
}