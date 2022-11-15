const sql = require('../../../config/dbConnection')

exports.checkActivationCodeAuthentication = (request,result)=>{
    const resultrecord = [];
    const activationcode = request.body.activationcode
    const idNumber = request.body.idNumber
    const deviceToken = request.body.deviceToken
    const date = new Date()
    // result(null,activationcode)
    // return;
    var arr = {}
    sql.query('SELECT a.*,b.application_name,b.applicationID,b.id AS APPUNIQUEID FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id  WHERE a.activationCode = "'+activationcode+'"',(err,res)=>{
        if(err){
            // console.log('testing')
            result(err,null)
            return;
        }

        if(res.length != 0)
        {

            sql.query('UPDATE tbl_app_users set appActivationStatus = 1, idNumber="'+idNumber+'", deviceToken= "'+deviceToken+'", activationCode=""  WHERE activationCode ="'+activationcode+'"',(error,resp)=>{
                if(error){
                    // console.log('testing2')
                    result(error,null)
                    return;
                }

                var dataArr = {};

                res.forEach(e => {
                    dataArr['id'] = e.id;
                    dataArr['name'] = e.name;
                    dataArr['email'] = e.email;
                    dataArr['phone'] = e.phone;
                    dataArr['country'] = e.country;
                    dataArr['documentType'] = e.documentType;
                    dataArr['documentNumber'] = e.documentNumber;
                    dataArr['idNumber'] = idNumber;

                })
                
                result(null, dataArr);
                
            })
        }
        else
        {
            const norec =  {
                status:201,
                message: "Invalid Activation Code"
              }    
              result(norec,null)
              return;
        }


    });
}