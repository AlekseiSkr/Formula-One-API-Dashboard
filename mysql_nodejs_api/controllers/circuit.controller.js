'use strict';
const Circuit = require('../models/circuit.model');
exports.findAll = function (req, res) {
  Circuit.findAll(function (err, circuit) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', circuit);
    res.send(circuit);
  });
};
exports.create = function (req, res) {
  const new_circuit = new Circuit(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Circuit.create(new_circuit, function (err, circuit) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Circuit added successfully!", data: circuit });
    });
  }
};
exports.findById = function (req, res) {
  Circuit.findById(req.params.id, function (err, circuit) {
    if (err)
      res.send(err);
    res.json(circuit);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Circuit.update(req.params.id, new Circuit(req.body), function (err, circuit) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Circuit successfully updated' });
    });
  }
};
exports.delete = function (req, res) {
  Circuit.delete(req.params.id, function (err, circuit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Circuit successfully deleted' });
  });
};