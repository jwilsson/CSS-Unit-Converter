var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var rev = require('gulp-rev-append');
var uglify = require('gulp-uglify');

gulp.task('jshint', function () {
    return gulp.src('./assets/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minify', function () {
    return gulp.src('./assets/style.css')
        .pipe(minify())
        .pipe(rename('./assets/style.min.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('uglify', function () {
    return gulp.src('./assets/script.js')
        .pipe(uglify())
        .pipe(rename('./assets/script.min.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('rev', function () {
    return gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['jshint', 'minify', 'uglify', 'rev']);
