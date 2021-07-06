'use strict';

const Driver = require('../models/driver.model');
const { route } = require('../routes/circuit.routes');
exports.findAll = function (req, res) {
  Driver.findAll(function (err, driver) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', driver);
    res.send(driver);
  });
};

/**
 * Create Driver Function
 * @param {*} req router call
 * @param {*} res 
 */
exports.create = function (req, res) {
  const new_driver = new Driver(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    console.log(req.body.id)
    Driver.create(new_driver, function (err, driver) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Driver added successfully!", data: driver });
    });
  }
};

exports.findById = function (req, res) {
  Driver.findById(req.params.id, function (err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Driver.update(req.params.id, new Driver(req.body), function (err, driver) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'Driver successfully updated' });
    });
  }
};

exports.delete = function (req, res) {
  Driver.delete(req.params.id, function (err, driver) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Driver successfully deleted' });
  });
};