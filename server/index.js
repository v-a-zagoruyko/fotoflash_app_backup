const express = require('express');
const path = require('path');
const http = require('http');
// const https = require('https');
const fs = require('fs');

const app = express();

// var options = {
//   key: fs.readFileSync('/home/react/keys/key.pem'),
//   cert: fs.readFileSync('/home/react/keys/cert.cert')
// };

app.use(express.static(path.join(__dirname, '..', 'build')));

const routes = require('./routes');
app.use('/', routes);

http.createServer(app).listen(80);
// https.createServer(app).listen(443);
