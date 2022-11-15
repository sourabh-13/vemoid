const usersDetailModel = require('../../../vemo-id-backend-mobile/models/Authentication/GetUserDetailsModel')

exports.getUserDetails = (req,res)=>{
    if (!req.body.appUserID && req.body.appUserID==null) {
        return res.status(400).send({
            success:'false',
            message: 'Please Provide App UserID!'
          });
      }
    usersDetailModel.GetuserDetails(req,(error,data)=>{
        if(error)
        {
            res.status(500).send({
                success: 'false',
                message: error.message || 'error'
            })
        }
        else
        {
            res.status(200).send({
                status: 200,
                //message: res.message || 'Data Collected Successfully!',
                record:data
            })
        }
    })
}