const customer = require('../../models/customer/GetCustomerByEmail')

exports.getCustomer = (req,res)=>{
    customer.getCustomerByEmail(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message: err.message || "error"
        });
        else 
        res.status(200).send({
            success: 'true',
            status: 200,
            data: data[0]
        });
    })
}