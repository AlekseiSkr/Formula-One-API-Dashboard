const express = require('express')
const router = express.Router()
const circuitController =   require('../controllers/circuit.controller');
// Retrieve all circuits
router.get('/', circuitController.findAll);
// Create a new circuit
router.post('/', circuitController.create);
// Retrieve a single circuit with id
router.get('/:id', circuitController.findById);
// Update a circuit with id
router.put('/:id', circuitController.update);
// Delete a circuit with id
router.delete('/:id', circuitController.delete);
module.exports = router