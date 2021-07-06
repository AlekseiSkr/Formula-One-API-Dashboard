'use strict';
const Race = require('../models/race.model');
exports.findAll = function(req, res) {
Race.findAll(function(err, race) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', race);
  res.send(race);
});
};
exports.create = function(req, res) {
const new_race = new Race(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Race.create(new_race, function(err, race) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Race added successfully!",data:race});
});
}
};
exports.findById = function(req, res) {
Race.findById(req.params.id, function(err, race) {
  if (err)
  res.send(err);
  res.json(race);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Race.update(req.params.id, new Race(req.body), function(err, race) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Race successfully updated' });
});
}
};
exports.delete = function(req, res) {
Race.delete( req.params.id, function(err, race) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Race successfully deleted' });
});
};