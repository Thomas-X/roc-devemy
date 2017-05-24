var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');


router.get('/getUserData', function (req, res, next) {


    // so user is logged in since there's data.
    if (req.user != null) {
        res.json(JSON.stringify({
            loggedIn: true,
            username: req.app.locals.username,
            email: req.app.locals.email,
            displayImage: req.app.locals.displayImage,
        }));
    } else if (req.user == null) {
        res.json(JSON.stringify({
            loggedIn: false
        }));
    }
});

router.get('/getCourseDataById', function (req, res, next) {
    if (req.isAuthenticated()) {
        var courses = [];

        function IloveRecursion(callback) {
            req.user.followedCourses.forEach(function (elem, index) {
                Course.findById(elem['courseId'], function (err, course) {
                    courses.push(course);
                    if ((index + 1) == req.user.followedCourses.length) {
                        callback();
                    }
                });
            });
        }

        IloveRecursion(function () {
            res.json(JSON.stringify({
                courses: courses,
            }))
        });
    }
});

router.get('/loggedIn', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.json(JSON.stringify({
            Authenticated: true,
        }));
    } else {
        res.json(JSON.stringify({
            Authenticated: false,
        }))
    }
});

router.get('/createCourse', function (req, res, next) {

    // if it's set it means user is logged in
    if (req.app.locals.username != null && req.user.role === 'teacher') {

        Course.create({
            title: null,
            imgURL: null,
            author: req.app.locals.username,
            authorId: req.user.id,
            creationDate: Date.now(),

        }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            res.json(doc._id);
        })
    }
    else {
        console.log('not authenticated!');
        res.json({userNotValid: true});
    }
});

router.post('/saveCourse', function (req, res, next) {
    if(req.app.locals.role == 'teacher' && req.body.delete == false) {
        console.log(req.app.locals.role, req.app.locals._id);
        Course.findById(req.body._id, function (err, doc) {
            if(doc.authorId == req.app.locals._id) {
                doc.title = req.body.title;
                doc.imgURL = req.body.imgURL;
                doc.URLToCourse = req.body.URL;
                doc.description = req.body.description;

                doc.save(function (err, updatedDoc) {
                    if(err) {
                        return console.log(err);
                    }
                    res.status(201)
                    res.json(JSON.stringify({
                        success: true
                    }))
                });
            } else {
                res.status(500);
                res.json(JSON.stringify({
                    success: false
                }))
            }
        })
    } else if (req.body.delete == true && req.app.locals.role == 'teacher') {
        console.log('not authenticated!');
    }
});

router.get('/getUserId', function(req,res,next) {
    if(req.app.locals._id != null) {
        res.json(JSON.stringify({
            id: req.app.locals._id,
            success: true
        }));
    } else if (req.app.locals._id == null) {
        res.json(JSON.stringify({
            success:false,
        }))
    }
});

router.get('/authUser', function (req, res, next) {
    if(req.app.locals._id != null) {
        res.json(JSON.stringify({
            success: true
        }));
    } else if (req.app.locals._id == null) {
        res.json(JSON.stringify({
            success:false,
        }))
    }
})

router.get('/myCourses', function (req, res, next) {
    if(req.app.locals.role == 'teacher') {
        Course.find({'authorId': req.app.locals._id}, function (err, docs) {
            console.log(docs);
            res.json(JSON.stringify({
                data: docs,
            }))
        });
    }
})

router.post('/removeCourse', function(req,res,next) {
    if(req.app.locals.role == 'teacher') {
        Course.find({'authorId' : req.app.locals._id}, function (err, docs) {
            docs.forEach(function (elem) {
                if(elem._id == req.body.id && !err) {
                    Course.findByIdAndRemove(req.body.id, function(err, doc) {
                        var response = {
                            success: true,
                            id: doc._id,
                    }
                    res.send(response);
                    });
                } else if (err) {
                    res.send({
                        success: false
                    })
                }
            });

        })
    }
});


module.exports = router;