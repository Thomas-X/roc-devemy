let mongoose = require('mongoose');

var Schema = mongoose.Schema;


let BlogSchema = new Schema({
    titel: {type: String},
});


let Blog = mongoose.model('Blog', BlogSchema);

module.exports.Blog = Blog;