var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var hbs = require('hbs');
var request = require('request');
var session = require('express-session');
var User = require('./models/User').User;
var jwt = require('jsonwebtoken');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/rocDevemy');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // connection open!!
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secretysecret'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/', index);

passport.use(new GoogleStrategy({
        clientID: '162588864112-vgmfiefsv6l7ku12r2di8r8qkhrnn3jt.apps.googleusercontent.com',
        clientSecret: 'zteyUMl3dnk7qnLfB3UeOU2b',
        callbackURL: "http://localhost:5002/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {



        // change this in production



        User.findOne({googleId: profile.id}, function (err, doc) {

            if(doc == null) {
                accessToken = jwt.sign({secret: 'OÃ*ÙÜÐJ+¢Éêó|9¹¡}_øÆ7Ø¯¿&7mºoMýì$éà0ðåSøöu-ëdDêóú³ë¨&ÔÜºÃÈs¢¶ªÞw4¶/ù¶:$>»4üqu»1²î¶*úa|Ë£ý¡gSÓR¾P³:OP]1Pn°2}ü£ÖÊØÏ¼+}_xùGtÿÁÒû?år²*FL%BJ_¤OÅò¼ùôñ<¼ZÆìl¾©³B×ðþºùöÎ§3Ï{tjdaâêAïâêTôv¾+nèÉ³>h¸x°æÈ§,«+ÝÒJ&xÓð»ÕPÍ$¸Ø]ºÑ£Eêé²ÌÀ³§rÄæzÜxßc&z¥·é-¥±§iy(-¦ëf_»3-ëþef"ÄZ'}, 'Ò¨·Õ¬E\ØK6ìoöUA£²,ïnJÚo,e8¤¯úÁbL·WÉíeªIÄÚ£Qy©q¶l3æfEUËõr;þ·pÓ¬ÈùÜK²SÐPuôÛÌíêÖ¦6yðoîú¾ÁÛ¾t(îbÁ!l^Ò¦(uc}A/h³{`%ÌZÍG#ÔÚWP_Í2¿ÎN,jàq´ïºQµÆeéK)ÜéÀbÈ¶b¿@×l.C£UC`\¹7íùÆkäº·¥%37C,º=¼È-Ø©¬PÛÛÅ6ëÙ¬ÛgCm£×¯ôÂÌå_@äÉµõÒ7rQ{ËfZùVÌÂÙAô÷*¿Ìª;>¢ËúS£9×5è(íÐÒå¹EÈ1¬qÈë1C1ìú¦ÛV', {algorithm: 'HS512'});
            }

            //check if we found a doc, if doc is null we create a new user, if doc isn't null we compare id's, for double safety :)
            if (doc != null) {
                if (doc.googleId == profile.id) {
                        return cb(err, doc);
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
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
