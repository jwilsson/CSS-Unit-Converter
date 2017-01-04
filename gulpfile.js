const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const del = require('del');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const handlebars = require('gulp-compile-handlebars');
const minimist = require('minimist');
const nested = require('postcss-nested');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const stylelint = require('gulp-stylelint');
const watch = require('gulp-watch');

const argv = minimist(process.argv.slice(2));
const isProduction = !!(argv.prod); // true if --prod flag is used

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
    return gulp.src(['./src/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('scripts', ['clean-js', 'lint-js'], () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: isProduction ? ['babili'] : [], // Only minify when in production
        }))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('./assets'));
});

gulp.task('lint-css', () => {
    return gulp.src('./src/css/*.css')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
                console: true,
                formatter: 'string',
            }],
        }));
});

gulp.task('styles', ['clean-css', 'lint-css'], () => {
    return gulp.src('./src/css/*.css')
        .pipe(postcss([
            nested,
        ]))
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulpif(isProduction, cssnano())) // Only minify when in production
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
