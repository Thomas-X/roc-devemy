var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author: {type: String, default: ''},
    comment: {type: String, default: ''},
    Date: {type: Date, default: Date.now},
});
var CourseSchema = new Schema({
    title: {type: String, default: ''},
    imgURL: {type: String, default: ''},
    URLToCourse: {type: String, default: ''},
    ratingAverage: {type: Number, default: 0},
    totalRatingCount: {type: Number, default: 0},
    comments: [Comment],
})

var Course = mongoose.model('Course', CourseSchema);

module.exports.Course = Course;