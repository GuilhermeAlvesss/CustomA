'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var request = require('request');
var routes = require('./routes');
var activity = require('./routes/activity');

var app = express();

app.set(process.env.PORT || 3000 );
//app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/jwt' }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/logout', routes.logout);

app.post('/save/', activity.save);
app.post('/validate/', activity.validate);
app.post('/publish/', activity.publish);
app.post('/execute/', activity.execute);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});