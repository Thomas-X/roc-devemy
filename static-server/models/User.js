var mongoose = require('mongoose');
var validate = require('mongoose-validator');


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
    token: {type: String, default: null, required: true, unique: true},
    isTeacher: {type: Boolean, default: false, required: true},
    ownedData: {type: Array, default: []},
});

var User = mongoose.model('User', UserSchema);

module.exports.User = User;