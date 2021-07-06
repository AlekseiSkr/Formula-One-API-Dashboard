const express = require('express')
const router = express.Router()
const raceController =   require('../controllers/race.controller');
// Retrieve all races
router.get('/', raceController.findAll);
// Create a new race
router.post('/', raceController.create);
// Retrieve a single race with id
router.get('/:id', raceController.findById);
// Update a race with id
router.put('/:id', raceController.update);
// Delete a race with id
router.delete('/:id', raceController.delete);
module.exports = router