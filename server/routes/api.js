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
// add this method to POST /createCourse and /removeCourse /saveEditCourse and removeAllStudentsFromCourse production
const teacherLoggedIn = (req, res, next) => {
    if (req.user.role == 'teacher') {
        next();
    } else {
        res.status(405).send();
    }
}

router.post('/getUserData', (req, res, next) => {
    // todo is to set all vars needed as keys here. instead of one big data object

    // why use a DB request here? so we get the most accurate data
    // also change this before production
    User.findById({token: req.body.token}, (err, user) => {
        if (!err) res.json({
            siteData: {
                googleId: user.googleId,
                displayName: user.displayName,
                displayImage: user.displayImage,
                email: user.email,
                role: user.role,
                followedCourses: user.followedCourses,
                finishedCourses: user.finishedCourses,
                token: user.token,
                isTeacher: user.isTeacher,
                ownedData: user.ownedData,
            }
        });
        else res.status(500).send();
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

router.post('/createCourse', (req, res, next) => {

    // force string type on variables to avoid validation error by mongoose
    Course.create({
        title: String(req.body.title),
        imgURL: String(req.body.imgURL),
        // authorId: req.user._id,
        // author: req.user.displayName,
        // authorEmail: req.user.email,
        URLToCourse: String(req.body.URLToCourse),
        description: String(req.body.description),
    }, (err, newCourse) => {
        if (!err) res.json({createCourse: newCourse});
        else res.status(500).send();
    });
});

router.post('/saveEditCourse', (req,res,next) => {
    Course.findById({_id: req.body.courseId}, (err, course ) => {
        if(!err) {
            course.title = req.body.title;
            course.imgURL = req.body.imgURL;
            course.description = req.body.description;
            course.URLToCourse = req.bod.URLToCourse;

            course.save((err, updatedCourse) => {
                if(!err) res.json({saveEditCourse: updatedCourse});
            })
        }
    })
});

router.post('/createComment', (req, res, next) => {
    Course.findById(req.body.courseId, function (err, course) {
        course.comments.push({
            author: req.user.displayName,
            authorId: req.user._id,
            authorImage: req.user.displayImage,
            comment: req.body.createComment
        });
        course.comments.sort(function (date1, date2) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            if (date1.date > date2.date) return -1;
            if (date1.date < date2.date) return 1;
            return 0;
        });


        course.save(function (err, updatedCourse) {
            if (!err) res.json({newComments: updatedCourse.comments});
            else res.status(500).send();
        })
    })
});

router.post('/removeComment', (req, res, next) => {
    Course.findById(req.body.courseId, (err, course) => {
        if (course.authorId == req.body.userId) {
            let comments = course.comments;
            comments.forEach((elem, index) => {
                if (elem._id == req.body.commentId) {
                    comments = comments.splice(index, 1);
                }
            })
            course.save(function (err, updatedCourse) {
                if (!err) res.json({newComments: updatedCourse.comments});
                else res.status(500).send();
            })
        } else {
            res.status(405).send();
        }
    })
});


router.post('/getCourse', (req, res, next) => {
    Course.findById(req.body.courseId, (err, course) => {
        if (!err) res.json({course: course});
        else res.status(404).send();
    })
});

router.post('/removeCourse', (req,res,next) => {
     Course.findByIdAndRemove(req.body.courseId, (err, course) => {
         if(!err) {
             User.update({}, {$pull: {followedCourses: req.body.courseId}}, (err, user) => {
                 User.update({}, {$pull: {finishedCourses: req.body.courseId}}, (err, user) => {
                     if (!err) res.status(200).send();
                     else res.status(500).send();
                 });
             })
         }
     })
});

router.post('/removeAllStudentsFromCourse', (req,res,next) => {
    Course.findById(req.body.courseId, (err, course) => {
        if (req.user.role == "teacher") {
            User.find({}, (err, users) => {
                users.forEach((user, index) => {
                    if (user.followedCourses.includes(req.body.courseId)) {
                        user.followedCourses.forEach((elem, index) => {
                            if (elem == req.body.courseId) {
                                user.followedCourses.splice(index, 1);
                            }
                        })
                    }
                    if (user.finishedCourses.includes(req.body.courseId)) {
                        user.finishedCourses.forEach((elem, index) => {
                            if (elem.courseId == req.body.courseId) {
                                user.finishedCourses.splice(index, 1);
                            }
                        });
                    }
                });
                users.forEach((elem, index) => {
                    elem.save((err) => {
                        if (!err && index == (users.length - 1)) res.json({success: true});
                    });
                })
            });
        }
    });
});

router.post('/getStudentsFollowingCourse', (req, res,next) => {
    if (req.body.courseId != null) {
        Course.findById(req.body.courseId, (err, course) => {
            if (!err && req.user.role == "teacher") {
                let usersFollowingCourse = [];
                User.find({}, function (err, users) {
                    users.forEach((user) => {
                        if (user.followedCourses.includes(req.body.courseId)) {
                            let finishedCourse = false;

                            user.finishedCourses.forEach((elem) => {
                                if (elem.courseId == req.body.courseId) {
                                    finishedCourse = true;
                                }
                            })

                            usersFollowingCourse.push({
                                _id: user._id,
                                username: user.displayName,
                                email: user.email,
                                finishedCourse: finishedCourse,
                            });
                        }
                    });
                    if (usersFollowingCourse.length > 0) {
                        res.send({users: usersFollowingCourse, success: true});
                    } else {
                        res.send({success: false});
                    }
                });
            } else {
                res.send({success: false});
            }
        })
    } else {
        res.send({success: false});
    }
});

router.post('/finishCourse', (req,res,next) => {
    if (req.body.courseId != null && req.body.notFinished == true) {
        Course.findById(req.body.courseId, (err, course) => {
            if (!err) {
                User.findById(req.body.user._id, function (err, user) {
                    if (!err) {
                        if (user.finishedCourses.length > 0) {

                            let foundOne = false;
                            user.finishedCourses.forEach((elem, index) => {

                                if (elem.courseId == req.body.courseId) {
                                    foundOne = true;
                                }

                                if (index == (user.finishedCourses.length - 1) && foundOne === false) {
                                    user.finishedCourses.push({courseId: req.body.courseId});
                                    user.save((err) => {
                                        if (!err) res.send({success: true, finishedCourse: true});
                                    });
                                }
                            });
                        } else {

                            let finishedCourses = user.finishedCourses;
                            finishedCourses.push({courseId: req.body.courseId});
                            user.save((err) => {
                                if (!err) res.send({success: true, finishedCourse: true});
                            });
                        }
                    }
                })
            }
        });
    } else if (req.body.notFinished == false && req.body.courseId != null) {
        // this is so if the user already finished it but for some reason it isnt finished any more
        // no we undo the fact that the user finished course
        Course.findById(req.body.courseId, (err, course) => {
            if (req.user.role == "teacher" && !err) {
                User.findById(req.body.user._id, (err, user) => {
                    if (!err) {
                        user.finishedCourses.forEach((elem, index) => {
                            if (user.finishedCourses[index].courseId == req.body.courseId) {
                                if (elem.courseId == req.body.courseId) {
                                    user.finishedCourses.splice(index, 1);
                                    user.save((err) => {
                                        if (!err) {
                                            res.send({success: true, finishedCourse: false})
                                        }
                                    });
                                }
                            }
                        })

                    }
                });
            }
        });
    }
});

router.post('/rateCourse', (req,res,next) => {
    if (req.user._id != null && req.body.rating <= 5 && req.body.rating >= 1) {
        Course.findById(req.body.courseId, function (err, course) {
            let sum = 0;
            var allRatingValues = course.allRatingValues;
            if (!err) {
                if (allRatingValues.length > 0) {
                    for (let i = 0; i < allRatingValues.length; i++) {
                        var elem = allRatingValues[i];
                        var index = i;
                        if (elem.authorId.equals(req.app.locals._id)) {
                            elem.rating = req.body.rating;
                            course.allRatingValues[index].rating = req.body.rating;
                        } else if ((index + 1) == allRatingValues.length) {
                            if (!elem.authorId.equals(req.app.locals._id)) {
                                allRatingValues.push({authorId: req.user._id, rating: req.body.rating});
                                course.totalRatingCount += 1;
                            }
                        }
                        sum += elem.rating;
                    }
                    course.ratingAverage = sum / (allRatingValues.length);
                    course.ratingAverage = course.ratingAverage.toFixed(1);

                } else if (allRatingValues.length <= 0) {
                    course.ratingAverage = req.body.rating;
                    course.ratingAverage = course.ratingAverage.toFixed(1);
                    course.totalRatingCount = 1;
                    allRatingValues.push({authorId: req.user._id, rating: req.body.rating});
                }

                course.save((err, updatedCourse) => {
                    if (err) res.json({success: false});
                    else res.json({success: true, course: updatedCourse});
                })
            }
        })
    }
})
module.exports = router;