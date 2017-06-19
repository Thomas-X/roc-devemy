var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');
var axios = require('axios');


// for now till production, dont use the checkToken function on ALL api routes
const checkToken = (req, res, next) => {
    if (req.body.token != null && req.body.token == req.user.token) {
        console.log(req.body.token, req.user.token);
        next();
    } else {
        res.status(405).send();
    }
}
// add this method to POST /createCourse on production
const teacherLoggedIn = (req,res,next) => {
    if(req.user.role == 'teacher') {
        next();
    } else {
        res.status(405).send();
    }
}

router.post('/getUserData', (req, res, next) => {
    // todo is to set all vars needed as keys here. instead of one big data object
    res.json({
        data: req.user
    })
});

router.post('/search', function (req, res, next) {
    var regex = new RegExp(req.body.searchQuery, 'i');
    Course.find({title: regex}, (err, courses) => {
        if (!err) res.json({
            courses: courses, success: true
        });
        if (err) res.json({
            success: false
        });
    });
});

router.post('/createCourse', (req,res,next) => {
     Course.create({
         title: req.body.title,
         imgURL: req.body.imgURL,
         authorId: req.user._id,
         author: req.user.displayName,
         URLToCourse: req.body.URLToCourse,
         description: req.body.description,
     },  (err, newCourse) => {
             if(!err) res.json({createCourse: newCourse});
             else res.status(500).send();
     });
});


module.exports = router;