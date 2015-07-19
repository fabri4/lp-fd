'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');


// server connect
gulp.task('connect', function() {
    connect.server({
        root: '../app',
        livereload: true
    });
});


// images
gulp.task('images', function () {
    gulp.src('../src/img/**/*')
        .pipe(gulp.dest('../app/img'));
});

gulp.task('images-min', function () {
    gulp.src('../src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../app/img'));
});



// fonts
gulp.task('fonts', function () {
    gulp.src('../src/fonts/**/*')
        .pipe(gulp.dest('../app/fonts'));
});


// css
gulp.task('css', function () {
    gulp.src('../src/css/style.scss')
        .pipe(sass())
        .pipe(autoprefixer('> 1%', 'last 3 versions', 'ie 9'))
        .pipe(rename("style.css"))
        .pipe(gulp.dest('../app/css'))
        .pipe(minifyCSS())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('../app/css'));
        //.pipe(connect.reload());
});

// html
gulp.task('html', function () {
    gulp.src('../app/*.html')
        .pipe(connect.reload());
});
// html-min
/*gulp.task('html-min', function() {
    return gulp.src('../app*//*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../app*//*.html'))
});*/

// js
gulp.task('js', function () {
    gulp.src('../src/js/main.js')
        .pipe(gulp.dest('../app/js'))
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest('../app/js'))
        .pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
    gulp.watch('../src/css/**/*', ['css']);
    gulp.watch('../src/js/main.js', ['js']);
    gulp.watch('../app/*.html', ['html'])
});

// default
gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);