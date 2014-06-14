var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var rev = require('gulp-rev-append');
var uglify = require('gulp-uglify');

var path = 'assets/';

gulp.task('jshint', function () {
    return gulp.src('./assets/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minify', function () {
    var name = 'style';

    return gulp.src(path + name + '.css')
        .pipe(minify())
        .pipe(rename(path + name + '.min.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('uglify', function () {
    var name = 'script';

    return gulp.src(path + name + '.js')
        .pipe(uglify())
        .pipe(rename(path + name + '.min.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('rev', function () {
    return gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['jshint', 'minify', 'uglify', 'rev']);
