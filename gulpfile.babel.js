import babel from 'gulp-babel';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import handlebars from 'gulp-compile-handlebars';
import nested from 'postcss-nested'
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import rev from 'gulp-rev';
import stylelint from 'stylelint';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import yargs from 'yargs';

const IS_PRODUCTION = !!(yargs.argv.prod); // true if --prod flag is used

gulp.task('clean-css', () => {
    return del([
        './assets/*.css'
    ]);
});

gulp.task('clean-js', () => {
    return del([
        './assets/*.js'
    ]);
});

gulp.task('lint-js', () => {
    return gulp.src(['./src/js/**/*.js', '!./src/js/vendor/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('scripts', ['clean-js', 'lint-js'], () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(concat('script.min.js'))
        .pipe(gulpif(IS_PRODUCTION, uglify())) // Only minify when in production
        .pipe(gulp.dest('./assets'));
});

gulp.task('styles', ['clean-css'], () => {
    return gulp.src('./src/css/*.css')
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
        .pipe(gulpif(IS_PRODUCTION, cssnano())) // Only minify when in production
        .pipe(gulp.dest('./assets'));
});

gulp.task('rev', ['scripts', 'styles'], () => {
    return gulp.src(['./assets/style.min.css', './assets/script.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('./assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./assets'))
});

gulp.task('index', ['rev'], () => {
    const manifest = JSON.parse(fs.readFileSync('./assets/rev-manifest.json', 'utf8'));

    return gulp.src('./src/index.hbs')
        .pipe(handlebars(manifest))
        .pipe(rename({
            extname: '.html',
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['default'], () => {
    watch(['./src/css/style.css', './src/js/**/*.js'], () => {
        gulp.start('index');
    });
});

gulp.task('default', ['index']);
