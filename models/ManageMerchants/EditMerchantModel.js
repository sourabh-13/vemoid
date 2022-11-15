const sql = require("../../config/dbConnection")
const CryptoJS = require('crypto-js')

exports.EditMerchants = (req, result)=>{
    const host = req.host;
    const port = 5000
    
    var encryptPassowrd = CryptoJS.MD5(req.body.password)
    if(req.body.company_image == ''){
        var sqls = 'UPDATE tbl_users SET registartion_number = "'+req.body.registartion_number+'", name = "'+req.body.name+'", company_name="'+req.body.company_name+'", address= "'+req.body.address+'", country= "'+req.body.country+'", phone_number="'+req.body.phone_number+'", email="'+req.body.email+'", password = "'+encryptPassowrd+'" WHERE id = "'+req.body.id+'"'


    }
    else{
        const filePath = req.protocol + "://" + host + ':' + port + '/image/' + req.file.filename;
        var sqls = 'UPDATE tbl_users SET registartion_number = "'+req.body.registartion_number+'", name = "'+req.body.name+'", company_name="'+req.body.company_name+'", address= "'+req.body.address+'", country= "'+req.body.country+'", phone_number="'+req.body.phone_number+'", email="'+req.body.email+'", password = "'+encryptPassowrd+'", company_image="'+filePath+'" WHERE id = "'+req.body.id+'"'

    }
    sql.query(sqls, (err,res)=>{
        if(err){
            //console.log('error')
            result(err,null)
            return;
        }
        //console.log(res)
        result(null, res)
        return;
    })
}