'use strict';
var dBcon = require('../config/db.config');
//Driver object create
var Driver = function (driver) {
  this.driverId = driver.driverId;
  this.driverRef = driver.driverRef;
  this.forename = driver.forename;
  this.surname = driver.surname;
  this.dob = driver.dob;
  this.nationality = driver.nationality;

};

Driver.create = function (newDriver, result) {
  dBcon.query("INSERT INTO drivers set ?", newDriver, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Driver.findById = function (id, result) {
  dBcon.query("Select * from drivers where driverId = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Driver.findByTerm = function (term, result){
  dBcon.query("SELECT * FROM `drivers` WHERE driverRef LIKE CONCAT('%', ?, '%') OR surname LIKE CONCAT('%', ?, '%') OR forename LIKE CONCAT('%', ?, '%') OR dob LIKE CONCAT('%', ?, '%') OR nationality LIKE CONCAT('%', ?, '%'); "
  , [term, term, term, term, term]
  , function(err, res){
    if(err) {
      console.log("error: "+err)
      result(err, null);
    }
    else {
      result(null, res)
    }
  })
};


Driver.findAll = function (result) {
  dBcon.query("Select * from drivers ORDER BY driverId ASC", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      // console.log('drivers : ', res);
      result(null, res);
    }
  });
};

Driver.update = function (id, driver, result) {
  dBcon.query("UPDATE drivers SET driverId=?,driverRef=?,forename=?,surname=?,dob=?,nationality=? WHERE driverId = ?",
   [driver.driverId, driver.driverRef, driver.forename, driver.surname, driver.dob, driver.nationality, id],
    function (err, res) {
    (driver.driverId !== id) ? console.error('ID mismatch[id1:'+driver.driverId+"id2"+id) : -1;
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Driver.delete = function (id, result) {
  dBcon.query("DELETE FROM drivers WHERE driverId = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
module.exports = Driver;