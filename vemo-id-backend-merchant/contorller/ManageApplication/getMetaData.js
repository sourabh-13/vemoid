const GetMetaData = require('../../../vemo-id-backend-merchant/models/ManageApplication/GetMetaDataModel')

exports.getmetadata = (req,res)=>{
    GetMetaData.GetMetadata(req,(err,data)=>{
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

