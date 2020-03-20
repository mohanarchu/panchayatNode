const express = require('express')
const streets = require('../contollers/streetController')
const streetsRouter = express.Router();
streetsRouter.route('/create').post(streets.create);
streetsRouter.route('/').get(streets.list)
streetsRouter.route('/:ID').delete(streets.delete).
                patch(streets.update).get(streets.byWard);
streetsRouter.route('/waterManByWard/:number/:waterMan').patch(streets.updateByWard);          
streetsRouter.route('/waterManByStreet/:ID/:waterMan').patch(streets.updateByStreet);        
module.exports = streetsRouter
