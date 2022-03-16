const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 5000));

app.get('/get', function(req, res) {
	res.json([0,0,0,0,0,1,1,1,1,1])
}).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
});

app.listen(port, () => {
	console.log('OK')
})
