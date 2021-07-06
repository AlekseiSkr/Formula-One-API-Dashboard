const express = require('express')
const router = express.Router()
const driverController =   require('../controllers/driver.controller');
// Retrieve all drivers
router.get('/', driverController.findAll);
// Create a new driver
router.post('/create_driver', driverController.create);
// Retrieve a single driver with id
router.get('/:id', driverController.findById);
// Update a driver with id
router.put('/update/:id', driverController.update);
// Delete a driver with id
router.delete('/delete/:id', driverController.delete);
module.exports = router