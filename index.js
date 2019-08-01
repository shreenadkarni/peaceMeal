const express = require('express');
const path = require('path');
//var cors = require('cors');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//app.use(cors);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', require('./api/api-index.js'));

// An api endpoint that returns a short list of items

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
