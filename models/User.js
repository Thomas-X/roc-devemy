var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var finishedCoursesSchema = new Schema({
    courseId: {type: String, default: null},
    date: {type: Date, default: Date.now}
})

var UserSchema = new Schema({
    googleId: {type: String, default: null},
    displayName: {type: String, default: null},
    displayImage: {type: String, default: null},
    email: {type: String, default: null},
    role: {type: String, default: 'student'},
    followedCourses: {type: [], default: null},
    finishedCourses: {type: [finishedCoursesSchema], default: null},
});

var User = mongoose.model('User', UserSchema);

module.exports.User = User;