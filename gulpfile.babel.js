import concat from 'gulp-concat';
import del from 'del';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import minify from 'gulp-minify-css';
import rename from 'gulp-rename';
import rev from 'gulp-rev-append';
import sass from 'gulp-sass';
import scsslint from 'gulp-scss-lint';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import yargs from 'yargs';

const IS_PRODUCTION = !!(yargs.argv.prod); // true if --prod flag is used

gulp.task('clean-fonts', (cb) => {
    del(['./assets/css/fonts/**/*'], cb);
});

gulp.task('clean-images', (cb) => {
    del(['./assets/css/img/**/*'], cb);
});

gulp.task('fonts', ['clean-fonts'], () => {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./assets/css/fonts'));
});

gulp.task('images', ['clean-images'], () => {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/css/img'));
});

gulp.task('lint-js', () => {
    return gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('scripts', ['lint-js'], () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(gulpif(IS_PRODUCTION, uglify())) // Only minify when in production
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('lint-scss', () => {
    return gulp.src(['./src/scss/**/*.scss', '!./src/scss/vendor/**/*.scss'])
        .pipe(scsslint());
});

gulp.task('styles', ['lint-scss'], () => {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(rename({
            suffix: '.min'
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
    watch('./src/fonts/**/*', () => {
        gulp.start('fonts');
    });

    watch('./src/img/**/*', () => {
        gulp.start('images');
    });

    watch('./src/js/**/*.js', () => {
        gulp.start('scripts');
    });

    watch('./src/scss/**/*.scss', () => {
        gulp.start('styles');
    });
});

gulp.task('default', ['fonts', 'images', 'scripts', 'styles', 'rev']);
