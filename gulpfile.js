"use strict";

let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./resources/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./resources/css'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch'], () => {
    //
});
