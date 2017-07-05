var express = require('express');
var router = express.Router();
let Blog = require('../models/Blog').Blog;

// Create operation op MongoDB
router.post('/addBlog', (req, res, next) => {
    Blog.create({
        titel: req.body.titel,
    }, (err, blogs) => {
        if (!err) res.json({newBlogData: blogs});
    })
});


// Read operation op MongoDB
router.get('/getAllBlogs', (req, res, next) => {
    Blog.find({}, (err, blogs) => {
        console.log(blogs);
        if (!err) {
            res.json({
                blogData: blogs,
            })
        }
    });
});

module.exports = router;
