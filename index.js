const express = require('express')
const app = express()
const { Client } = require('pg')
const client = new Client()
await client.connect()

app.set('port', (process.env.PORT || 5000));
	
app.get('/get', function(req, res) {
	const q = await client.query('SELECT $1::text as message', ['Hello world!'])
	console.log(q.rows[0].message) // Hello world!
	await client.end()
}).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
});
