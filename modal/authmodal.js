const mongoose = require('mongoose');

const authForm = mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    userEmail: { type: String, unique: true, required: true },
    userMobile: { type: String, unique: true, required: true },
    userId: { type: String, unique: true, required: true, select: false },
});

const authModal = mongoose.model('userList', authForm);

module.exports = { authModal }