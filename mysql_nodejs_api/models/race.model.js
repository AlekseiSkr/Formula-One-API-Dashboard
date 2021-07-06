'use strict';
var dBcon = require('../config/db.config');
//Race object create
var Race = function(race){
  this.RaceID           = race.RaceID;
  this.CircuitID        = race.CircuitID;
  this.SeasonYear       = race.SeasonYear;
  this.SeasonRound      = race.SeasonRound;
  this.CircuitName      = race.CircuitName;
  this.Date             = race.Date;
  this.Time             = race.Time;

};
Race.create = function (newRace, result) {
dBcon.query("INSERT INTO races set ?", newRace, function (err, res) {
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
Race.findById = function (id, result) {
dBcon.query("Select * from races where RaceID = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Race.findAll = function (result) {
dBcon.query("Select * from races", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('races : ', res);
  result(null, res);
}
});
};
Race.update = function(id, race, result){
dBcon.query("UPDATE races SET RaceID=?,RaceRef=?,SeasonYear=?,SeasonRound=?,CircuitName=?,Date=?,Time=? WHERE id = ?", [race.RaceID,race.RaceRef,race.SeasonYear,race.SeasonRound,race.CircuitName,race.Date,race.Time, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Race.delete = function(id, result){
dBcon.query("DELETE FROM races WHERE RaceID = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Race;