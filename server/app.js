var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session');
var request = require('request');
var hbs = require('hbs');


var index = require('./routes/index');
var api = require('./routes/api');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/rocDevemy');

var User = require('./models/User').User;

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secretysecret'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(function (req, res, next) {

    // todo replace this with http://localhost:3000 for added security
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'cache-control, Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use('/', index);
app.use('/api', api);


passport.use(new GoogleStrategy({
        clientID: '162588864112-vgmfiefsv6l7ku12r2di8r8qkhrnn3jt.apps.googleusercontent.com',
        clientSecret: 'zteyUMl3dnk7qnLfB3UeOU2b',
        callbackURL: "http://localhost:7000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {


        User.findOne({googleId: profile.id}, function (err, doc) {
            //check if we found a doc, if doc is null we create a new user, if doc isn't null we compare id's, for double safety :)
            if (doc != null) {
                if (doc.googleId == profile.id) {
                    doc.token = String(accessToken);
                    User.findOneAndUpdate({googleId: profile.id}, {token: String(accessToken)},{new: true}, (err, newUser) => {
                        if (!err) return cb(err, newUser);
                    })
                }
            } else if (doc == null) {
                User.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    displayImage: profile._json.image['url'],
                    email: String(profile.emails[0]['value']),
                    role: 'student',
                    followedCourses: [],
                    token: accessToken,
                    isTeacher: false,
                }, function (err, val) {
                    val.token = String(accessToken);
                    return cb(err, val);
                });
            }
        })
        ;
    }
))
;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = app;