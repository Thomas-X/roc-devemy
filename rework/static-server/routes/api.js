var express = require('express');
var router = express.Router();
var User = require('../models/User').User;
var Course = require('../models/Course').Course;
var passport = require('passport');
var request = require('request');
var path = require('path');


router.post('/getUserData', (req, res, next) => {
    // todo is to set all vars needed as keys here. instead of one big data object

    // why use a DB request here? so we get the most accurate data
    // also change this before production

    let user = null;

    User.find({token: String(req.body.token)}, (err, mUser) => {
        console.log(err);
        console.log(user);
        console.log(req.body.token);

        user = mUser[0];

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


module.exports = router;