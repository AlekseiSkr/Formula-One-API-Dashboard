'use strict';
var dBcon = require('../config/db.config');
//Circuit object create
var Circuit = function(circuit){
  this.CircuitID        = circuit.CircuitID;
  this.CircuitRef       = circuit.CircuitRef;
  this.CircuitName      = circuit.CircuitName;
  this.Location         = circuit.Location;
  this.Country          = circuit.Country;
  this.lat              = circuit.lat;
  this.lng              = circuit.lng;

};
Circuit.create = function (newCircuit, result) {
dBcon.query("INSERT INTO circuits set ?", newCircuit, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Circuit.findById = function (id, result) {
dBcon.query("Select * from circuits where CircuitID = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Circuit.findAll = function (result) {
dBcon.query("Select * from circuits", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('circuits : ', res);
  result(null, res);
}
});
};
Circuit.update = function(id, circuit, result){
dBcon.query("UPDATE circuits SET CircuitID=?,CircuitRef=?,CircuitName=?,Location=?,Country=?,lat=?,lng=? WHERE id = ?", [circuit.CircuitID,circuit.CircuitRef,circuit.CircuitName,circuit.Location,circuit.Country,circuit.lat,circuit.lng, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Circuit.delete = function(id, result){
dBcon.query("DELETE FROM circuits WHERE CircuitID = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Circuit;