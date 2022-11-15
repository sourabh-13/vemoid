const sql = require("../../../config/dbConnection")
const CryptoJS = require('crypto-js')

exports.AddEndUser = (req,result)=>{
    sql.query('SELECT *  FROM tbl_users WHERE email = "'+req.body.email+'"', (err,res)=>{
        if(err){
            console.log('Testing')
            result(err,null)
            return;
        }
        if(res.length > 0){
            console.log('Email Already Exist')
            return;
        }

        else{
            var encryptPassword = CryptoJS.MD5(req.body.password)
            sql.query(`INSERT INTO tbl_users(name,email,registartion_number, country, company_name, address,phone_number,password,user_type,parentID)
            VALUES('${req.body.name}', '${req.body.email}', '${req.body.registartion_number}', '${req.body.country}', '${req.body.company_name}','${req.body.address}', '${req.body.phone_number}', '${encryptPassword}','${req.body.user_type}', '${req.body.user_id}');`,(error,resp)=>{
                if(error){
                    result(error,null)
                    return;
                }
            })
        }
        result(null,res)
        return;
    })
}