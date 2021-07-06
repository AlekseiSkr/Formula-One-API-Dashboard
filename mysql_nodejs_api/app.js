const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 4001;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(express.json())
// define a root route
app.get('/', (req, res) => {
  res.redirect('../index.html');
});

// Require circuit routes // using as middleware
const circuitRoutes = require('./routes/circuit.routes')
app.use('/formula_api/circuits', circuitRoutes)
//Require drivers routes // using middleware
const driverRoutes = require('./routes/driver.routes')
app.use('/formula_api/drivers', driverRoutes)
//Require races routes // using middleware
const raceRoutes = require('./routes/race.routes')
app.use('/formula_api/races', raceRoutes)

app.use(express.static('./public'))

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



//////////OLD VERSION///////////////////////

// const express = require('express');     //import express 
// const morgan = require('morgan');       //import morgan error (npm i morgan) 
// const mysql = require('mysql');         //import mysql
// const bodyParser = require('body-parser');

// function getCon(){
//     return mysql.createConnection({    //setup mysql connection
//         host: 'localhost',
//         user: 'root',
//         database: 'formula1',
//         password: ""
//     });
// }
    

// const app = express();
// const port = process.env.PORT || 4001;  //port
// app.use(morgan('short'));               //morgan setup
// app.use(express.static('./public'));    //serving files inside public dirr
// app.use(bodyParser.urlencoded({extended: false}));


// app.post('/create_sth', (req, res) =>{
//     console.log('Creating a new user');
//     console.log("POST: " + req.body.text1 + ", " + req.body.text2);
//     text1 = req.body.text1;
//     text2 = req.body.text2;

//     sql = "INSERT INTO circuits VALUES (?,?)";
//     getCon().query(sql, [text1, text2], (err, results) => {
//         if (err){
//             console.log("Bad insert" + err);
//             res.sendStatus(500);
//             return;
//         }
//         console.log("Good insert of : " + text1);
//     })


//     res.end();
// });



// app.get('/', (_, res) => {
//     res.send("Root route")
// })

// app.get('/circuits', (_, res) => {
//     const queryString =  "SELECT * FROM circuits"; //LIMIT SET FOR TESTING PURPOSES
//     getCon().query(queryString, (err, rows) => {
//         if (err) {
//             console.log("Failed to query for circuits: " + err);
//             req.sendStatus(500);
//             return;
//         }
//         console.log("circuits Loaded");
//         res.json(rows);
//     })
// })

// app.get('/circuits/:id', (req, res) =>{
//     console.log("Fetching circuit with id: " + req.params.id);
//     const circuitID = req.params.id;
//     const queryString =  "SELECT * FROM circuits WHERE CircuitID = ?";
//     getCon().query(queryString, [circuitID], (err, rows, _fields) =>{
//         if (err) {
//             console.log("Failed to query for circuits: " + err);
//             req.sendStatus(500);
//             return;
//         }
//         console.log("circuit id: "+ circuitID +" Loaded");
//         console.log(rows);
//         res.json(rows);
        
//     });
// });

// app.get('/drivers', (_, res) => {
//     const queryString =  "SELECT * FROM drivers LIMIT 100"; //LIMIT SET FOR TESTING PURPOSES
//     getCon().query(queryString, (err, rows) => {
//         if (err) {
//             console.log("Failed to query for drivers: " + err);
//             req.sendStatus(500);
//             return;
//         }
//         console.log("drivers Loaded");
//         res.json(rows);
//     })
// })

// app.get('/drivers/:id', (req, res) =>{
//     console.log("Fetching drivers with id: " + req.params.id);
//     const driverId = req.params.id;
//     const queryString =  "SELECT * FROM drivers WHERE driverId = ?";
//     getCon().query(queryString, [driverId], (err, rows, _fields) =>{
//         if (err) {
//             console.log("Failed to query for drivers: " + err);
//             req.sendStatus(500);
//             return;
//         }
//         console.log("drivers Loaded");
//         res.json(rows);
//     }) 
// });

// app.get('/races', (_, res) => {
//     const queryString =  "SELECT * FROM races LIMIT 100"; //LIMIT SET FOR TESTING PURPOSES
//     getCon().query(queryString, (err, rows) => {
//         if (err) {
//             console.log("Failed to query for races: " + err);
//             req.sendStatus(500);
//             return;
//         }
//         console.log("races Loaded");
//         res.json(rows);
//     })
// })

// app.get('/races/:id', (req, res) =>{
//     console.log("Fetching races with id: " + req.params.id);
//     const RaceID = req.params.id;
//     const queryString =  "SELECT * FROM races WHERE RaceID = ?";
//     getCon().query(queryString, [RaceID], (err, rows, _fields) =>{
//         if (err) {
//             console.log("Failed to query for races: " + err);
//             req.sendStatus(500);
//             return;
//         }
//         console.log("races Loaded");
//         res.json(rows);
//     }) 
// });

// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });