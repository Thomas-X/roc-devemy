var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var request = require('request');
var hbs = require('hbs');

var User = require('./models/User').User;


var index = require('./routes/index');
var api = require('./routes/api');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/rocDevemy');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // connection open!!
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
// public folder for when react builds, redirected than to public
app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
app.use(express.static(path.join(__dirname, '../client/build')));

// enabling CORS
app.use(function (req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'cache-control, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', index);
app.use('/api', api);


module.exports = app;