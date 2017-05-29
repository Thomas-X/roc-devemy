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


router.get('/getUserProfile', function (req, res, next) {

    // we don't have to worry about wheter user is logged in because we can just use isLoggedIn here and don't need to give
    // an unique response versus the .get route /getUserData

    if (req.isAuthenticated()) {
        res.json(JSON.stringify({
            data: req.user,
            Authenticated: true,
        }));
    } else {
        res.json(JSON.stringify({
            Authenticated: false,
        }))
    }

});

router.get('/getCourseDataById', function (req, res, next) {
    if (req.isAuthenticated()) {
        var courses = [];

        function IloveRecursion(callback) {
            req.user.followedCourses.forEach(function (elem, index) {
                Course.findById(elem, function (err, course) {
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
                success: true,
            }))
        });
    } else {
        res.json({success: false})
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
    if (req.app.locals.role == 'teacher' && req.body.delete == false) {
        Course.findById(req.body._id, function (err, doc) {
            if (doc.authorId == req.app.locals._id) {
                doc.title = req.body.title;
                doc.imgURL = req.body.imgURL;
                doc.URLToCourse = req.body.URL;
                doc.description = req.body.description;

                doc.save(function (err, updatedDoc) {
                    if (err) {
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
        Course.findById(req.body._id, function (err, doc) {
            console.log(req.body._id, doc);
            if (doc.authorId == req.app.locals._id) {
                Course.findByIdAndRemove(req.body._id, function (err, doc) {
                    res.sendStatus(200);
                });
            }
        })
    }
});

router.get('/getUserId', function (req, res, next) {
    if (req.app.locals._id != null) {
        res.json(JSON.stringify({
            id: req.app.locals._id,
            success: true
        }));
    } else if (req.app.locals._id == null) {
        res.json(JSON.stringify({
            success: false,
        }))
    }
});

router.get('/authUser', function (req, res, next) {
    if (req.app.locals._id != null) {
        res.json(JSON.stringify({
            success: true
        }));
    } else if (req.app.locals._id == null) {
        res.json(JSON.stringify({
            success: false,
        }))
    }
})

router.get('/myCourses', function (req, res, next) {
    if (req.app.locals.role == 'teacher') {
        Course.find({'authorId': req.app.locals._id}, function (err, docs) {
            console.log(docs);
            res.json(JSON.stringify({
                data: docs,
            }))
        });
    }
})

router.post('/removeCourse', function (req, res, next) {
    if (req.app.locals.role == 'teacher') {
        Course.find({'authorId': req.app.locals._id}, function (err, docs) {
            docs.forEach(function (elem) {
                if (elem._id == req.body.id && !err) {
                    Course.findByIdAndRemove(req.body.id, function (err, doc) {
                        var response = {
                            success: true,
                            id: doc._id,
                        }
                        res.status(200)
                        res.send(response);
                    });
                } else if (err) {
                    res.status(500);
                    res.send({
                        success: false
                    })
                }
            });
        })
    }
});

router.post('/search', function (req, res, next) {
    var regex = new RegExp(req.body.searchQuery, 'i');
    Course.find({title: regex}, function (err, courses) {
        console.log(req.body.searchQuery, courses);
        if (!err) res.send({courses: courses, success: true});
        if (err) res.send({success: false});
    });
});

router.post('/getCourseById', function (req, res, next) {
    Course.findById(req.body._id, function (err, course) {
        if (!err) res.send({course: course, success: true});
        if (err) res.send({course: course, success: false});
    })
});

router.post('/followCourse', function (req, res, next) {
    Course.findById(req.body._id, function (err, course) {
        if (err) res.send({success: false});
        if (req.app.locals._id != null && !err) {
            User.update({_id: req.app.locals._id}, {$addToSet: {followedCourses: req.body._id}}, function (err, user) {
                res.send({success: true});
                if (err) res.send({success: false});
            })
        }
    })
});

router.get('/getFollowedCourses', function (req, res, next) {
    User.findById(req.app.locals._id, function (err, user) {
        if (!err && req.app.locals._id != null) res.send({followedCourses: user.followedCourses, success: true});
        else res.send({success: false});
    })
})

router.post('/unFollowCourse', function (req, res, next) {
    User.update({_id: req.app.locals._id}, {pull: {followedCourses: req.body._id}},function (err, user) {
        if(!err && req.app.locals._id != null) res.send({success: true});
        else res.send({success: false});
        console.log(user);
    })
})

module.exports = router;