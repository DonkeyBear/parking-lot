const express = require('express')
const app = express()
const fs = require('fs')

app.set('port', (process.env.PORT || 5000));
	
app.get('/get', function(req, res) {	
	fs.readFile('sensor.json', 'utf8' , (err, data) => {
		if (err) { console.error(err) }
		res.json(JSON.parse(data))
	})
}).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
});
