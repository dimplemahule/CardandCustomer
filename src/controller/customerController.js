const customerModel = require('../model/customerModel');
const valid = require('../validation/valid')

const createCustomer = async function (req, res) {
    try {
        let data = req.body;
        let {firstName,lastName,mobileNumber,DOB,emailID,address,status} = data
        if(Object.keys(data).length == 0){
            return res.status(400).send({status:false, message:"Data is required"})
        }
        
        if(!valid.isValid(firstName)){
            return res.status(400).send({status:false, message:"Enter first name"}) 
        }
        if(!valid.isValid(lastName)){
            return res.status(400).send({status:false, message:"Enter last name"})  
        }
        if(!valid.isValid(mobileNumber)){
            return res.status(400).send({status:false, message:"Enter mobile Number"})  
        }
        if(!valid.phoneValidationRegex(mobileNumber)){
            return res.status(400).send({status:false, message:"Enter a 10 digist mobile Number"})  
        }

        let checkMobNo = await customerModel.findOne({mobileNumber:mobileNumber})
        if(checkMobNo){ 
            return res.status(404).send({status:false, message:`${mobileNumber} Mobile number is already exist`})
        }
        if(!valid.isValid(DOB)){
            return res.status(400).send({status:false, message:"Enter DOB"})  
        }
        if(!valid.emailValidationRegex(emailID)){
            return res.status(400).send({status:false, message:"Enter valid emailID"})  
        }
        let checkemail = await customerModel.findOne({emailID:emailID})
        if(checkemail){ 
            return res.status(404).send({status:false, message:`${emailID} Email Id is already exist`})
        }

        if(!valid.isValid(address)){
            return res.status(400).send({status:false, message:"Enter address"})  
        }
        if(!valid.isValid(status)){
            return res.status(400).send({status:false, message:"Enter status"})  
        }
        if(status != "ACTIVE" && status != "INACTIVE"){
            return res.status(404).send({status:false, message:"status can only be ACTIVE and INACTIVE"})
        }
        let savedData = await customerModel.create(data);
        res.status(201).send({ msg: savedData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const getdata = async function (req, res) {
    try {
        let custDetail = await customerModel.find({status:"ACTIVE"});
        res.status(200).send({ message: 'success', data: custDetail })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const deleteCust = async function (req, res) {

    try {
       const customerID = req.params.customerID;
       const data = await customerModel.findByIdAndUpdate({_id:customerID, status:"ACTIVE"},{status:"INACTIVE"}, {new:true})
       res.status(200).send({data:data})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createCustomer = createCustomer
module.exports.getdata = getdata
module.exports.deleteCust = deleteCust