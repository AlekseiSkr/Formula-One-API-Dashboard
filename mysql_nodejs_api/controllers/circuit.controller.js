'use strict';
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const Circuit = require('../models/circuit.model');
const jsonSchema = require('../schemas/JSON/CircuitInfoSchema.json')

function JSONtoXML(circuit){
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>';
  xml += '<circuitList>';
  circuit.forEach(function(circuit) {
    xml += '<circuit>';
    xml += '<circuitId>' + circuit.CircuitID + '</circuitId>';
    xml += '<circuitRef>' + circuit.CircuitRef + '</circuitRef>';
    xml += '<circuitName>' + circuit.CircuitName + '</circuitName>';
    xml += '<location>' + circuit.Location + '</location>';
    xml += '<country>' + circuit.Country + '</country>';
    xml += '<lat>' + circuit.lat + '</lat>';
    xml += '<lng>' + circuit.lng + '</lng>';
    xml += '</circuit>';
  });
  xml += '</circuitList>';
  return xml;
}

exports.findAll = function (req, res) {
  const validator = ajv.compile(jsonSchema);
  Circuit.findAll(function (err, circuit) {
    console.log('controller')
    if (err)
      res.send(err);
    const valid = validator(circuit);
    if (!valid) {
      res.send({
        error: validator.errors
      });
    } else {
      console.log('res', circuit);
      res.send(circuit);
    }
  });
};

//XML
//XML driver.controller.js
exports.XMLfindAll = function (req, res) {
  Circuit.findAll(function (err, circuit) {
    if (err)
      res.send(err);
  
    let xml = JSONtoXML(circuit);
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  });
};

exports.create = function (req, res) {
  const validator = ajv.compile(jsonSchema);
  const new_circuit = new Circuit(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Circuit.create(new_circuit, function (err, circuit) {
      if (err)
        res.send(err);
      const valid = validator(circuit);
      if (!valid) {
        res.send({
          error: validator.errors
        });
      } else {
        res.json({ error: false, message: "Circuit added successfully!", data: circuit });
      }
    });
  }
};


exports.findById = function (req, res) {
  const validate = ajv.compile(jsonSchema);
  const valid = validate(req.params.id);
  if (valid) {
    Circuit.findById(req.params.id, function (err, circuit){
      if (err)
        res.send(err);
      res.json(circuit);
    });
  } else {
    res.status(400).json(validate.errors);
  }
};

exports.update = function (req, res) {
  const validator = ajv.compile(jsonSchema);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    const valid = validator(req.body);
    if (!valid) {
      res.status(400).send({
        error: validator.errors
      });
    } else {
      Circuit.update(req.params.id, new Circuit(req.body), function (err, circuit) {
        if (err)
          res.send(err);
        res.json({ error: false, message: 'Circuit successfully updated' });
      });
    }
  }
};

exports.delete = function (req, res) {
  Circuit.delete(req.params.id, function (err, circuit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Circuit successfully deleted' });
  });
};