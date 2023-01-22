'use strict';
const Driver = require('../models/driver.model');
// const { route } = require('../routes/driver.routes');

function JSONtoXML(driver){
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>';
  xml += '<DriverList>';
  driver.forEach(function(driver) {
    xml += '<Driver>';
    xml += '<DriverId>' + driver.driverId + '</DriverId>';
    xml += '<DriverRef>' + driver.driverRef + '</DriverRef>';
    xml += '<forename>' + driver.forename + '</forename>';
    xml += '<surname>' + driver.surname + '</surname>';
    xml += '<dob>' + driver.dob + '</dob>';
    xml += '<nationality>' + driver.nationality + '</nationality>';
    xml += '</Driver>';
  });
  xml += '</DriverList>';
  return xml;
}

/**
 * Find All
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = function (req, res) {
  Driver.findAll(function (err, driver) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', driver);
    res.send(driver);
  });
};

//XML
//XML driver.controller.js
exports.XMLfindAll = function (req, res) {
  Driver.findAll(function (err, driver) {
    if (err)
      res.send(err);
  
    let xml = JSONtoXML(driver);
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  });
};

/**
 * Find by ID
 * @param {*} req 
 * @param {*} res 
 */
 exports.findById = function (req, res) {
  Driver.findById(req.params.id, function (err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
  });
};

/**
 * Find by Term
 * @param {*} req 
 * @param {*} res 
 */
exports.findByTerm = function (req, res) {
  Driver.findByTerm(req.params.term, function (err, driver) {
    if (err)
      res.send(err);
    res.json(driver);
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
    Driver.create(new_driver, function (err, driver) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Driver added successfully!", data: driver });
    });
  }
};

/**
 * Update
 * @param {U} req id, driver object
 * @param {*} res 
 */
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

/**
 * Delete
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function (req, res) {
  Driver.delete(req.params.id, function (err, driver) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'Driver successfully deleted' });
  });
};