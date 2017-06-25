var express = require('express');
var router = express.Router();
var User = require('../database/models/User').User;
var Course = require('rework/database').Course;
var passport = require('passport');
var request = require('request');
var path = require('path');

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/app', (req,res) => {
    res.sendfile(path.resolve('../client/build/index.html'));
});




module.exports = router;