const ward = require('../modal/wardModel')
 

exports.create =   async (req, res) => {
    const arrays   = req.body;

    try {

        await ward.insertMany(arrays)
        return res.status(200).send({ status: 200,error: "", message: "Created successfully..!" });
    } catch (error) {
        return res.status(400).send({ status: 400, error: error, message: "Failed" });
    }
}

exports.list = async (req,res) => {
 try {
        const data = await ward.find()
       return res.status(200).send({ status: 200, error: "", result : data  });
    } catch (err) {
        return res.status(400).send({ status: 400, error: err, message: "Failed!" });
    }
} 
 
  
exports.update = async (req,res) => {
  try {
         const file   = await ward.findByIdAndUpdate(req.params.ID, req.body , { new  : true,    runValidators : true });
         res.status(200).send({  status : "success", message : "Updated successfully",  data : file  })
     } catch(err){
        return res.status(400).send({ status: 400, error: err, message: "Failed to update " });
     }
  };

exports.delete  = async  (req,res) => {  
    try {  
        await ward.findOneAndDelete(req.params.ID)
        res.status(200).send({
            status : 200, error : "" , data : "user deleted successfully" })
    } catch(err) {
        return res.status(400).send({ status: 400, error: err, message: failed });
    }  
};
 