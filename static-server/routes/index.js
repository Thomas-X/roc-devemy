var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');
var request = require('request');
var path = require('path');

/* GET home page. */
router.get('/app', function(req, res, next) {
  res.sendFile((path.join(__dirname, '../client/build/index.html')))
});
module.exports = router;
