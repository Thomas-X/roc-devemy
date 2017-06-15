var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');

// for getting course or user, nice and organised

function isStudentLoggedInData() {
    let auth = false;

}


function isSameStudentLoggedInData() {
    let auth = false;

}


function isTeacherLoggedIn(req, res, next) {
    if (req.app.locals.role === 'teacher') {
        next();
    } else {
        res.redirect('http://localhost:3000/');
    }
}

function isTeacherLoggedInData(req, res, next, callback) {
    let auth = {};

    if (req.app.locals.role === 'teacher' && req.app.locals._id) {
        User.findById(req.app.locals._id, (err, user) => {
            if (!err) {
                auth = {
                    user: user,
                    auth: true,
                }
                callback(auth);
            } else {
                auth = {
                    user: null,
                    auth: false,
                }
                callback(auth);
            }
        });
    }
}

function isSameTeacherLoggedIn(req, res, next) {
    Course.find({
        $and: [
            {_id: req.body.courseId},
            {authorId: req.app.locals._id}
        ]
    }, (err, course) => {
        if (!err) next();
        else res.redirect('http://localhost:3000/');
    });
}

function isSameTeacherLoggedInData(req, res, next, callback) {
    let auth = {};
    Course.find({
        $and: [
            {_id: req.body.courseId},
            {authorId: req.app.locals._id}
        ]
    }, (err, course) => {
        if (!err) {
            auth = {
                course: course,
                auth: true,
            }
            callback(auth);
        } else {
            auth = {
                course: course,
                auth: false,
            }
            callback(auth);
        }
    });
}


// for authentication

function isLoggedIn(req, res, next) {
    if (req.app.locals._id != null) {
        next();
    } else if (req.app.locals._id == null) {
        res.redirect('http://localhost:3000/');
    }
}

// for data

function isLoggedInData(req, res, next, callback) {
    let auth = {};
    User.findById(req.app.locals._id, (err, user) => {
        if (!err) {
            auth = {
                user: user,
                auth: true,
            }
            callback(auth);
        } else {
            auth = {
                auth: false,
                user: null,
            }
            callback(auth);
        }
    })
}

router.get('/getUserData', isLoggedIn, function (req, res, next) {

    isLoggedInData(req, res, next, (data) => {
        data.auth
            ?
            (() => {
                res.json({
                    auth: data.auth,
                    username: data.user.displayName,
                    email: data.user.email,
                    displayImage: data.user.displayImage,
                    role: data.user.role,
                });
            })()
            :
            (() => {
                res.json({
                    auth: data.auth,
                });
            })()
    });
});

router.get('/getUserProfile', isLoggedIn, function (req, res, next) {

    isLoggedInData(req, res, next, (data) => {
        data.auth ?
            (() => {
                var finishedCoursesData = [];
                if (data.user.finishedCourses.length > 0) {
                    data.user.finishedCourses.forEach((elem, index) => {
                        Course.findById(elem.courseId, function (err, course) {
                            if (!err) finishedCoursesData.push(course);
                            if ((index) == (data.user.finishedCourses.length - 1)) {
                                res.json({
                                    data: data.user,
                                    finishedCoursesData: finishedCoursesData,
                                    auth: data.auth
                                });
                            }
                        })
                    })
                } else {
                    res.json({
                        data: data.user,
                        finishedCoursesData: finishedCoursesData,
                        auth: data.auth

                    });
                }
            })()
            :
            (() => {
                res.json({
                    auth: data.auth
                });
            })()
    })
});

router.get('/getCourseDataById', isLoggedIn, function (req, res, next) {

    isLoggedInData(req, res, next, (data) => {
        data.auth ?
            (() => {
                let courses = [];

                user.followedCourses.forEach((elem, index) => {
                    Course.findById(elem, (err, course) => {
                        courses.push(course);
                        if ((index + 1) == user.followedCourses.length) {
                            res.json({
                                courses: courses,
                                auth: data.auth,
                            });
                        }
                    })
                })
            })()
            :
            (() => {
                res.json({
                    auth: data.auth
                });
            })()
    })
});

// TODO
// /loggedIn was deleted here since it's not needed anymore, but do check for it later when fixing react
// components

router.get('/createCourse', isTeacherLoggedIn, function (req, res, next) {

    isTeacherLoggedInData((data) => {
        console.log(data.auth, data);
        data.auth ?
            (() => {
                Course.create({
                    title: null,
                    imgURL: null,
                    author: data.user.displayName,
                    authorId: data.user._id,
                    creationDate: Date.now(),

                }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json(doc._id);
                })
            })()
            :
            (() => {
                res.json({
                    auth: data.auth
                })
            })()
    })
});
router.get('/test', function (req, res, next) {
    (() => {
        console.log('Ok');
        res.json({hi: 'hi'});

    })()

});

// deleted the req.body.delete option and moved the deleting part to /deleteCourse
router.post('/saveCourse', isSameTeacherLoggedIn, function (req, res, next) {

    isSameTeacherLoggedInData(req, res, next, (data) => {
        data.auth ?
            (() => {
                Course.findById(data.course._id, (err, course) => {
                    course.title = req.body.title;
                    course.imgURL = req.body.imgURL;
                    course.URLToCourse = req.body.URL;
                    course.description = req.body.description;
                    // this might create errors


                    course.save((err, updatedCourse) => {
                        if (!err) {
                            res.json({
                                auth: data.auth,
                            })
                        }
                    })
                })
            })()
            :
            (() => {
                res.json({
                    auth: data.auth,
                })
            })()
    })
});

router.post('/deleteCourse', isSameTeacherLoggedIn, function (req, res, next) {

})

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
                    console.log(req.body.id);
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
    let firstTime = false;

    Course.findById(req.body._id, function (err, course) {
            User.findById(req.app.locals._id, function (err2, user) {
                if (user != null) {
                    let followedCourses;
                    let foundItem;
                    if (user.followedCourses != null) followedCourses = user.followedCourses;
                    if (followedCourses.length > 0) {
                        followedCourses.forEach((elem, index) => {
                            if (elem == course._id) {
                                foundItem = true;
                            }
                            if (index == followedCourses[followedCourses.length - 1] && foundItem === false) {
                                firstTime = true;
                            }

                        });
                    } else {
                        firstTime = true;
                    }
                }
                if (!err) res.send({
                    course: course,
                    success: true,
                    userImage: req.app.locals.displayImage,
                    userId: req.app.locals._id,
                    author: req.app.locals.username,
                    firstTime: firstTime,
                });
                if (err) res.send({course: course, success: false});
            });
        }
    )
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
    User.update({_id: req.app.locals._id}, {$pull: {followedCourses: req.body._id}}, function (err, user) {
        if (!err && req.app.locals._id != null) res.send({success: true});
        else res.send({success: false});
        console.log(user);
    })
})

router.post('/rateCourse', function (req, res, next) {
    if (req.app.locals._id != null && req.body.rating <= 5 && req.body.rating >= 1) {
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
                                allRatingValues.push({authorId: req.app.locals._id, rating: req.body.rating});
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
                    allRatingValues.push({authorId: req.app.locals._id, rating: req.body.rating});
                }

                course.save((err, updatedCourse) => {
                    if (err) res.json({success: false});
                    else res.json({success: true, course: updatedCourse});
                })
            }
        })
    }
})

router.post('/createComment', function (req, res, next) {
    if (req.app.locals._id != null) {
        if (req.app.locals._id.equals(req.body._id)) {
            Course.findById(req.body.courseId, function (err, course) {
                course.comments.push({
                    author: req.body.author,
                    authorId: req.app.locals._id,
                    authorImage: req.app.locals.displayImage,
                    comment: req.body.comment

                });
                course.comments.sort(function (date1, date2) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    if (date1.date > date2.date) return -1;
                    if (date1.date < date2.date) return 1;
                    return 0;
                });


                course.save(function (err, updatedCourse) {

                    console.log(updatedCourse.comments);

                    if (!err) res.json({success: true, newComments: updatedCourse.comments});
                    else res.json({success: false});
                })
            })
        } else {

            res.json({success: false});
        }
    } else {
        res.json({success: false});
    }

});

router.post('/deleteComment', function (req, res, next) {
    if (req.body.userId == req.app.locals._id) {
        Course.findById(req.body.courseId, function (err, course) {
            let comments = course.comments;
            comments.forEach((elem, index) => {
                if (elem._id == req.body._id) {
                    comments = comments.splice(index, 1);
                }
            })
            course.save(function (err, updatedCourse) {
                if (!err) res.json({success: true, newComments: updatedCourse.comments});
                else res.json({success: false});
            })
        });

    }
});

router.post('/getStudentsFollowingCourse', function (req, res, next) {
    if (req.body.courseId != null) {
        Course.findById(req.body.courseId, (err, course) => {
            if (course.authorId != req.app.locals._id) {
                res.send({authenticated: false});
            }
            if (req.app.locals.role == 'teacher' && !err && course.authorId == req.app.locals._id) {
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
            } else if (course.authorId == req.app.locals._id) {
                res.send({success: false});
            }
        })
    } else {
        res.send({success: false});
    }
});

router.post('/finishCourse', function (req, res, next) {
    if (req.body.courseId != null && req.body.notFinished == true) {
        console.log('user is finished but we say yes to him called')
        Course.findById(req.body.courseId, (err, course) => {
            if (course.authorId != req.app.locals._id) {
                res.send({authenticated: false});
            }
            if (req.app.locals.role == 'teacher' && !err && course.authorId == req.app.locals._id) {
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

                            console.log('finished courses else');
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
        console.log('user is finished but we say no to him called')
        // this is so if the user already finished it but for some reason it isnt finished any more
        // no we undo the fact that the user finished course
        Course.findById(req.body.courseId, (err, course) => {
            if (course.authorId != req.app.locals._id) {
                res.send({authenticated: false});
            }
            console.log('first if after auth:', req.app.locals.role === 'teacher' && !err && course.authorId == req.app.locals._id);
            if (req.app.locals.role === 'teacher' && !err && course.authorId == req.app.locals._id) {
                User.findById(req.body.user._id, (err, user) => {
                    console.log('user find by id errr', err);
                    if (!err) {
                        console.log('finished courses includes', user.finishedCourses.includes(req.body.courseId));
                        user.finishedCourses.forEach((elem, index) => {
                            if (user.finishedCourses[index].courseId == req.body.courseId) {
                                console.log('foreach elem == courseid', elem.courseId == req.body.courseId);
                                if (elem.courseId == req.body.courseId) {
                                    user.finishedCourses.splice(index, 1);
                                    user.save((err) => {
                                        if (!err) {
                                            console.log('sending success call..');
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

router.post('/removeAllStudentsFromCourse', function (req, res, next) {
    Course.findById(req.body.courseId, (err, course) => {
        if (course.authorId != req.app.locals._id) {
            res.json({authenticated: false});
        }
        if (req.app.locals.role === 'teacher' && !err && course.authorId == req.app.locals._id) {
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

router.post('/iFrameData', function (req, res, next) {

    // there is no auth here since this data is public and not sensitive

    User.findById(req.body.userId, (err, user) => {
        if (!err && user.finishedCourses != null && user.finishedCourses.length > 0) {
            user.finishedCourses.forEach((elem, index) => {
                if (elem.courseId == req.body.courseId) {
                    Course.findById(req.body.courseId, (err, course) => {
                        if (!err) {
                            let iFrameData = {};
                            iFrameData.title = course.title;
                            iFrameData.date = elem.date;
                            iFrameData.username = user.displayName;
                            res.json({iFrameData: iFrameData, success: true});
                        } else {
                            res.json({success: false})
                        }
                    })
                } else {
                    res.json({success: false})
                }
            })
        } else {
            res.json({success: false})
        }
    })

});

router.post('/getCourseData', function (req, res, next) {
    if (req.body.courseId != null) {
        Course.findById(req.body.courseId, (err, course) => {
            if (req.app.locals._id == course.authorId) {
                res.json({
                    title: course.title,
                    imgURL: course.imgURL,
                    URLToCourse: course.URLToCourse,
                    description: course.description,
                    success: true,
                })
            } else {
                console.log('invalid author')
                res.json({success: false});

            }
        })
    } else {
        console.log('req.body.courseid is null')
        res.json({success: false});
    }
});

router.post('/saveEditCourse', function (req, res, next) {
    if (req.body.courseId != null) {
        Course.findById(req.body.courseId, (err, course) => {
            if (req.app.locals._id == course.authorId) {
                if (req.body.description.indexOf('\n') != -1) {
                    req.body.description = req.body.description.replace('\n', '<br/>');
                }
                course.title = req.body.title;
                course.imgURL = req.body.imgURL;
                course.URLToCourse = req.body.URLToCourse;
                course.description = req.body.description;
                course.save((err) => {
                    if (!err) res.json({success: true});
                });
            } else {
                res.json({success: false});
            }
        })
    } else {
        res.json({success: false});
    }
});
module.exports = router;