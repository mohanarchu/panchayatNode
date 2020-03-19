
const mongoose = require('mongoose')

const authForm = mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    userEmail: { type: String },
    userMobile: { type: String, unique: true, required: true },
    userId: { type: String, unique: true, required: true, select: false },
    ward : { type: Number, required : true},
    blood : {  
       bloodGroup : { type : String , default : null } ,
       willingToDonate : { type  : Boolean , default : false } 
    } ,
    imagePath : { type : String , data : Buffer } ,
    designation : { type : String , required : true } ,
    designationId : {type : Number, required : true } 
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } );


const users = mongoose.model('users',authForm);
module.exports =  users;