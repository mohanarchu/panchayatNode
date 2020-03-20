
const mongoose = require('mongoose')

const authForm = mongoose.Schema({
    streetName: { type: String, required: true, trim: true },
    streetNumber: { type: Number, required: true },
    fromHouseNumber: { type: Number },
    toHouseNumber: { type: Number },
    noOfHouses: { type: Number},
    waterMan: { type: mongoose.Schema.Types.ObjectId , ref : "users" },
    ward : { type:  Number , ref: 'wards' },

},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } );


const users = mongoose.model('streets',authForm);
module.exports =  users;