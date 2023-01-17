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

