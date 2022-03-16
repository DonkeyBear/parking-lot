const express = require('express')
const app = express()
const fs = require('fs')

app.set('port', (process.env.PORT || 5000));
	
app.get('/', function(req, res) {
	fs.readFile('sensor.json', 'utf8' , (err, data) => {
		if (err) { console.error(err) ; return ;}
		res.json(JSON.parse(data))
	})
}).post('/', function(req, res) {
	console.log(req.param);
	let sensor_data = req.param('sensor') || '';
	if(sensor_data.length != 10) {
		res.status(400).json({"error":"data"})
		return;
	}
	fs.writeFile('sensor.json', sensor_data, err => {
		if (err) { console.error(err) ; return ;}
		fs.readFile('sensor.json', 'utf8' , (err2, data) => {
			if (err2) { console.error(err2) ; return ;}
			res.json(JSON.parse(data))
		})
	})
}).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
});
