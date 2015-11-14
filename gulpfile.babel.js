import babel from 'gulp-babel';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import minify from 'gulp-minify-css';
import nested from 'postcss-nested'
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import rev from 'gulp-rev-append';
import stylelint from 'stylelint';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import yargs from 'yargs';

const IS_PRODUCTION = !!(yargs.argv.prod); // true if --prod flag is used

gulp.task('lint-js', () => {
    return gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('scripts', ['lint-js'], () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(concat('script.min.js'))
        .pipe(gulpif(IS_PRODUCTION, uglify())) // Only minify when in production
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('styles', () => {
    return gulp.src('./src/css/style.css')
        .pipe(postcss([
            nested,
            stylelint,
        ]))
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulpif(IS_PRODUCTION, minify())) // Only minify when in production
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('rev', function () {
    return gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['default'], () => {
    watch('./src/js/**/*.js', () => {
        gulp.start('scripts');
    });

    watch('./src/css/style.css', () => {
        gulp.start('styles');
    });
});

gulp.task('default', ['scripts', 'styles', 'rev']);
