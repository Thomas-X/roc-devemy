var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');
var request = require('request');
var path = require('path');

const CheckTokenAndReturnUserInReqUser = (req, res, next) => {
    User.findOne({token: req.body.token}, (err, user) => {
        if (!err && user != null && user.role == "teacher" || user.role == "student") {
            req.user = user;
            next();
        } else {
            res.status(405).send();
        }
    });
}

const CheckTokenAndReturnUserInReqUserTeacher = (req, res, next) => {
    User.findOne({token: req.body.token}, (err, user) => {
        console.log('checktoken', err, user, req.body.token);
        if (!err && user != null && user.role == "teacher") {
            req.user = user;
            next();
        } else {
            res.status(405).send();
        }
    })
}


router.post('/getUserData', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
    let user = req.user;

    Course.find({authorId: user._id}, (err, courses) => {
        let ownedData = [];
        if (courses != null) {
            courses.forEach((elem, index) => {
                ownedData.push(elem);
            });
        }

        if (!err) res.json({
            googleId: user.googleId,
            displayName: user.displayName,
            displayImage: user.displayImage,
            email: user.email,
            role: user.role,
            followedCourses: user.followedCourses,
            finishedCourses: user.finishedCourses,
            token: user.token,
            isTeacher: user.isTeacher,
            ownedData: ownedData,
            _id: user._id,
        });
        else res.status(500).send();
    });
});


router.post('/search', CheckTokenAndReturnUserInReqUser, function (req, res, next) {
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

router.post('/createCourse', CheckTokenAndReturnUserInReqUserTeacher, (req, res, next) => {
    let mUser = req.user;


    // force string type on variables to avoid validation error by mongoose

    Course.create({
        title: String(req.body.title),
        imgURL: String(req.body.imgURL),
        authorId: String(mUser._id),
        author: String(mUser.displayName),
        authorEmail: String(mUser.email),
        URLToCourse: String(req.body.URLToCourse),
        description: String(req.body.description),
    }, (err, newCourse) => {
        if (!err) res.json({createCourse: newCourse});
        else res.status(500).send();
    });
});

router.post('/saveEditCourse', CheckTokenAndReturnUserInReqUserTeacher, (req, res, next) => {
    Course.findById({_id: req.body.courseId}, (err, course) => {
        if (!err) {
            course.title = req.body.title;
            course.imgURL = req.body.imgURL;
            course.description = req.body.description;
            course.URLToCourse = req.body.URLToCourse;

            course.save((err, updatedCourse) => {
                if (!err) res.json({saveEditCourse: updatedCourse});
            })
        }
    })
});

router.post('/createComment', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
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

router.post('/removeComment', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
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


router.post('/getCourse', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
    Course.findById(req.body.courseId, (err, course) => {
        if (!err) res.json({course: course});
        else res.status(404).send();
    })
});

router.post('/removeCourse', CheckTokenAndReturnUserInReqUserTeacher, (req, res, next) => {
    Course.findByIdAndRemove(req.body.courseId, (err) => {
        if (!err) {
            User.find({}, (err, users) => {
                users.forEach((user) => {
                    let userFollowedCourses = user.followedCourses;
                    if (userFollowedCourses.length > 0) {
                        userFollowedCourses.forEach((elem) => {
                            if (elem == req.body.courseId) {
                                userFollowedCourses.splice(userFollowedCourses.indexOf(elem), 1);
                                user.save((err) => {
                                    if (err) res.status(500).send();
                                });
                            }
                        })
                    }
                    if (user.finishedCourses.length > 0) {
                        let userFinishedCourses = user.finishedCourses;
                        userFinishedCourses.forEach((elem) => {
                            if (elem.courseId == req.body.courseId) {
                                user.finishedCourses.splice(userFinishedCourses.indexOf(elem), 1);
                                user.save((err) => {
                                    if (err) res.status(500).send();
                                });
                            }
                        })
                    }
                });
            });
            res.status(200).send();
        } else {
            console.log(err);
            res.status(500).send();
        }
    });
});

router.post('/removeAllStudentsFromCourse', CheckTokenAndReturnUserInReqUserTeacher, (req, res, next) => {
    Course.findById(req.body.courseId, (err, course) => {
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
    });
});

router.post('/getStudentsFollowingCourse', CheckTokenAndReturnUserInReqUserTeacher, (req, res, next) => {
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

router.post('/finishCourse', CheckTokenAndReturnUserInReqUserTeacher, (req, res, next) => {
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

router.post('/rateCourse', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
    if (req.user._id != null && req.body.rating <= 5 && req.body.rating >= 1) {
        Course.findById(req.body.courseId, (err, course) => {
            let sum = 0;
            var allRatingValues = course.allRatingValues;

            console.log(err, !err);

            if (!err) {
                if (allRatingValues.length > 0) {
                    for (let i = 0; i < allRatingValues.length; i++) {
                        var elem = allRatingValues[i];
                        var index = i;

                        console.log(elem.authorId == req.user._id);

                        if (elem.authorId == req.user._id) {
                            console.log(elem.rating);
                            course.allRatingValues[i].rating = req.body.rating;
                            console.log(elem.rating);
                        } else if ((index + 1) == allRatingValues.length) {
                            if (!elem.authorId == req.user._id) {
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
                    allRatingValues.push({authorId: String(req.user._id), rating: req.body.rating});
                }

                course.save((err, updatedCourse) => {
                    if (err) res.status(500).send();
                    else {
                        res.status(200);
                        res.json({success: true, course: updatedCourse});
                    }
                })
            }
        })
    }
})

router.post('/unfollowCourse', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
    User.update({token: req.body.token}, {$pull: {followedCourses: req.body.courseId}},
        (err, user) => {
            if (!err) res.json({
                user: user,
            });
        });
});

router.post('/followCourse', CheckTokenAndReturnUserInReqUser, (req, res, next) => {
    User.update(
        {token: req.body.token},
        {$addToSet: {followedCourses: req.body.courseId}},
        (err, user) => {
            if (!err) res.json({
                user: user,
            })
        })
});

module.exports = router;