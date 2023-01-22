'use strict';
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const jsonSchema = require('../schemas/JSON/RaceInfoSchema.json')

function JSONtoXML(race) {
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>';
  xml += '<raceList>';
  race.forEach(function (race) {
    xml += '<race>';
    xml += '<raceId>' + race.CircuitID + '</raceId>';
    xml += '<SeasonYear>' + race.SeasonYear + '</SeasonYear>';
    xml += '<SeasonRound>' + race.SeasonRound + '</SeasonRound>';
    xml += '<CircuitName>' + race.CircuitName + '</CircuitName>';
    xml += '<Date>' + race.Date + '</Date>';
    xml += '<Time>' + race.Time + '</Time>';
    xml += '</race>';
  });
  xml += '</raceList>';
  return xml;
}
const Race = require('../models/race.model');

//XML
//XML driver.controller.js
exports.XMLfindAll = function (req, res) {
  Race.findAll(function (err, race) {
    if (err)
      res.send(err);
  
    let xml = JSONtoXML(race);
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  });
};

exports.findAll = function (req, res) {
  const validator = ajv.compile(jsonSchema);
  Race.findAll(function (err, race) {
    console.log('controller')
    if (err)
      res.send(err);
    const valid = validator(race);
    if (!valid) {
      res.send({
        error: validator.errors
      });
    } else {
      console.log('res', race);
      res.send(race);
    }
  });
};

exports.create = function (req, res) {
  const validator = ajv.compile(jsonSchema);
  const new_race = new Race(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Race.create(new_race, function (err, race) {
      if (err)
        res.send(err);
      const valid = validator(race);
      if (!valid) {
        res.send({
          error: validator.errors
        });
      } else {
        res.json({ error: false, message: "Race added successfully!", data: race });
      }
    });
  }
};


exports.findById = function (req, res) {
  const validator = ajv.compile(jsonSchema);
  Race.findById(req.params.id, function (err, race) {
    if (err)
      res.send(err);
    const valid = validator(race);
    if (!valid) {
      res.send({
        error: validator.errors
      });
    } else {
      res.json(race);
    }
  });
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
      Race.update(req.params.id, new Race(req.body), function (err, race) {
        if (err)
          res.send(err);
        res.json({ error: false, message: 'Race successfully updated' });
      });
    }
  }
};

exports.delete = function (req, res) {
  Race.delete(req.params.id, function (err, race) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Race successfully deleted' });
  });
};