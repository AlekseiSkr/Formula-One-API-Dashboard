'use strict';
const mysql = require('mysql');
//local mysql db connection
const dBcon = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'formula1'
});
dBcon.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dBcon;