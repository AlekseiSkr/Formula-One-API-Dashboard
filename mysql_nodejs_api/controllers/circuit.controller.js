'use strict';
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const Circuit = require('../models/circuit.model');
const jsonSchema = {
	"$schema": "http://json-schema.org/draft-07/schema#",
  	"$id": "http://example.com/product.schema.json",
  	"title": "Circuit",
  	"description": "Circuit Information",
  	"properties": {
  		"CircuitID" : {
  			"description": "unique number identifier for Circuit",
  			"type" : "integer"
  		},
  		"CircuitRef" : {
  			"description" : "unique char identifier for Circuit",
  			"type" : "string",
			"minLength": 3
  		},
  		"CircuitName" : {
  			"description" : "Name of a Circuit",
  			"type" : "string",
			"minLength": 3
  		},
  		"Location" : {
  			"description" : "Location of a Circuit",
  			"type" : "string",
			"minLength": 3
  		},
  		"Country" : {
  			"description" : "Country of a Circuit",
  			"type" : "string",
			"minLength": 3
  		},
  		"lat" : {
  			"description" : "latitude of a Circuit",
  			"type" : "integer",
			"minimum": 10.5
  		},
  		"lng" : {
  			"description" : "longitude of a Circuit",
  			"type" : "integer",
			"minimum": 10.5
  		}
  	},
  	"required" : ["CircuitID", "CircuitRef", "CircuitName"]
}

function JSONtoXML(circuit){
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>';
  xml += '<circuitList>';
  circuit.forEach(function(circuit) {
    xml += '<circuit>';
    xml += '<circuitId>' + circuit.circuitId + '</circuitId>';
    xml += '<circuitRef>' + circuit.circuitRef + '</circuitRef>';
    xml += '<forename>' + circuit.forename + '</forename>';
    xml += '<surname>' + circuit.surname + '</surname>';
    xml += '<dob>' + circuit.dob + '</dob>';
    xml += '<nationality>' + circuit.nationality + '</nationality>';
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