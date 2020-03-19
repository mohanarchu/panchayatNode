const express = require('express')
const users = require('../contollers/userControllers')

const userRouter = express.Router();

userRouter.route('/create').post(users.create);
userRouter.route('/').get(users.listUsers)
userRouter.route('/:ID').delete(users.delete).
                patch(users.update).get(users.viewUser);
// userRouter.route('/byValues').post(users.viewByDesignation)                
module.exports = userRouter
