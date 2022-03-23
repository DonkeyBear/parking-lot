const express = require('express')
const app = express()
const fs = require('fs')

app.set('port', (process.env.PORT || 5000));

app.get('/api', function (req, res) {
  fs.readFile('sensor.txt', 'utf8', (err, data) => {
    if (err) { console.error(err); return; }
    res.send(data)
  })
}).post('/api', function (req, res) {
  if (req.param('token') != 'PASS') {
    res.status(403).send('Forbidden')
    return;
  }
  let sensor_data = req.param('sensor') || '';
  /*
  // Data length valid
  if(sensor_data.length != 10) {
    res.status(400).send('Data not enough')
    return;
  }
  */
  fs.writeFile('sensor.txt', sensor_data, err => {
    if (err) { console.error(err); return; }
    fs.readFile('sensor.txt', 'utf8', (err2, data) => {
      if (err2) { console.error(err2); return; }
      res.send(data)
    })
  })
}).use(express.static('public'))
  .listen(app.get('port'), () => {
    console.log('App is running, server is listening on port ', app.get('port'));
  })
