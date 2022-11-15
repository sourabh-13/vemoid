const CreateFaqModel = require("../../models/FAQ/CreateFaqModel");
exports.cretefaqq=(req,res)=>{
 

//   if (!req.body.questions && req.body.questions == null) {
//     return res.status(400).send({
//       success: "false",
//       msg: "questions field  is empty!",
//     });
//   }

//   if (!req.body.messages && req.body.messages == null) {
//     return res.status(400).send({
//       success: "false",
//       msg: "message field  is empty!",
//     });
//   }
 

    CreateFaqModel.Createfaq(req,(err,data)=>{
        if (err)
        res.status(500).send({
          success: 'false',
          message:
            err.message || "error"
        });
      else res.status(200).send({
        success: 'true',
        data:data
      });
    });
};