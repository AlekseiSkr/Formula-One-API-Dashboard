const express = require('express')
const router = express.Router()
const circuitController =   require('../controllers/circuit.controller');
// Retrieve all circuits
router.get('/', circuitController.findAll);
// XML FORMAt
// router.get('/XML', circuitController.XMLfindAll);

// Create a new circuit
router.post('/create', circuitController.create)

// Retrieve a single circuit with id
router.get('/:id', circuitController.findById);

// Retrieve a single circuit with specific term
// router.get('/search/:term', circuitController.findByTerm);

// Update a circuit with id
router.put('/update/:id', circuitController.update);

// Delete a circuit with id
router.delete('/delete/:id', circuitController.delete);

module.exports = router