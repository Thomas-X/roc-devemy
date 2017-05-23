var gulp = require("gulp");
var gutil = require("gulp-util");
var notify = require('gulp-notify');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

var browserSync = require("browser-sync").create();

var ENTRY_FILE = "./public/jsx/app.jsx";
var OUTPUT_DIR = "./public/dist";
var OUTPUT_FILE = "bundle.js";
var DELAY = 0;

gulp.task("watch", function () {
    exec('START cmd /k "cd C:\\Program Files\\MongoDB\\Server\\3.4\\bin & mongod"', function (err, stdout, stderr) {
    });
    exec('START cmd /k "cd C:\\Program Files\\MongoDB\\Server\\3.4\\bin & mongo & mongo & mongo & mongo & mongo & mongo & mongo"', function (err, stdout, stderr) {
    });
    var b = browserify({ entries: [ ENTRY_FILE ] }).transform(babelify);

    function bundle() {
        b.bundle()
            .on("log", gutil.log)
            .on("error", notify.onError())
            .pipe(source(OUTPUT_FILE))
            .pipe(buffer())
            .pipe(gulp.dest(OUTPUT_DIR))
            .pipe(browserSync.reload({ stream: true }));
    }

    watchify(b, { delay: DELAY }).on("update", bundle);
    bundle();
});

gulp.task("serve", ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://127.0.0.1:5000",
        files: ["public/**/*.*"],
        port: 7000,
    });
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'bin/www'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task("default", [ "watch", "serve" ]);