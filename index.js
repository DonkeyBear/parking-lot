const express = require('express')
const app = express()
const port = 3000

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()
db.data ||= { sensor: [] }
await db.write()

app.set('port', (process.env.PORT || 5000));

app.get('/get', function(request, response) {
	res.json(db.data)
}).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
});

app.listen(port, () => {
	console.log('OK')
})
