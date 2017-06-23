var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');
var request = require('request');

router.get('/', function (req, res, next) {
    res.render('index', {token: req.user.token});
});

router.get('/logout', isLoggedIn, function (req, res, next) {

    req.logout();
    res.redirect('/');
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read',
            'https://www.googleapis.com/auth/plus.profiles.read',
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/plus.circles.read',
            'https://www.googleapis.com/auth/userinfo.profile'
        ] //, hostedDomain: 'roc-dev.com' TODO uncomment this after testing so only roc-dev.com domains are allowed.
}));


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if user isn't logged in redirect them to the home page
    res.redirect('/');
}

module.exports = router;