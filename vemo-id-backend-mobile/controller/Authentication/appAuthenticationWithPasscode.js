const AppAuthenticationWithPassCodeModel = require('../../../vemo-id-backend-mobile/models/Authentication/AppAuthenticationWithPasscodeModel')

exports.appAuthenticationWithPasscode = (request,res)=>{
    if(!request.body.appUserID=="" && request.body.appUserID==null)
    {
        return res.status(400).send({
            success: 'false',
            message: 'Please Provide App User Id'
        });
    }
    if(!request.body.enteredApplicationID=="" && request.body.enteredApplicationID==null)
    {
        return res.status(400).send({
            success: 'false',
            message: 'Please Provide Application Id'
        });
    }
    if(!request.body.transactionID=="" && request.body.transactionID==null)
    {
        return res.status(400).send({
            success: 'false',
            message: 'Please Provide Transaction Id'
        });
    }
    if(!request.body.ipAddress=="" && request.body.ipAddress==null)
    {
        //return response()->json(array('success'=>'false','message'=>'Please Provide IP Address'));
       ipAddress = "192.168.1.109";
    }
    if(!request.body.browser=="" && request.body.browser==null)
    {
        return res.status(400).send({
            success: 'false',
            message:'Please Provide Device Name'
        })
    }

    AppAuthenticationWithPassCodeModel.appAuthenticationWithPasscode(request,(err,data)=>{
        if(err){
            res.status(500).send({
                success: 'false',
                message: err.message || 'error'
            })
        }
        else{
            res.status(200).send({
                success: 'true',
                data: data,
            })
        }
    })

}