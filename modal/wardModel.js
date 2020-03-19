
const mongoose = require('mongoose')

const authForm = mongoose.Schema({
    wardName: { type: String, required: true , trim: true ,unique: true },
    wardNumber: { type: String, required: true , unique: true}
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } );


const users = mongoose.model('ward',authForm);
module.exports =  users;