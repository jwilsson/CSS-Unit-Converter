var gulp = require('gulp');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var path = 'assets/';

gulp.task('minify', function () {
    var name = 'style';

    gulp.src(path + name + '.css')
        .pipe(minify())
        .pipe(rename(path + name + '.min.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('uglify', function () {
    var name = 'script';

    gulp.src(path + name + '.js')
        .pipe(uglify())
        .pipe(rename(path + name + '.min.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['minify', 'uglify']);
