'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require("browser-sync").create();

var AUTOPREFIXER_BROWSERS = [
    'ie >= 8',
    'ie_mob >= 9',
    'ff >= 28',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 3',
    'bb >= 10'
];


gulp.task('styles', function() {
    return gulp.src([
        './assets/*.scss',
        './assets/*.css'
    ])
    .pipe($.changed('styles', { extension: '.scss'}))
    .pipe($.rubySass({ precision: 10 })
        .on('error', console.error.bind(console))
    )
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))

    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('bundle/css'))
    .pipe($.size({ title: 'styles'}));
});