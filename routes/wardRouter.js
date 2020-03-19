const express = require('express')
const wards = require('../contollers/wardController')

const wardRouter = express.Router();

wardRouter.route('/create').post(wards.create);
wardRouter.route('/').get(wards.list)
wardRouter.route('/:ID').delete(wards.delete).
                patch(wards.update);
module.exports = wardRouter
