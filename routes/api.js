var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');


router.get('/getUserData',(req,res,next) => {
    console.log(req.user);
     res.json(req.user);
});



    


module.exports = router;