const browserify = require('browserify');
const babelify = require('babelify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');

var isProduction = false;
var isLocalDev = false;

gulp.task('is-production', () => {
  isProduction = true;
});

gulp.task('is-local-dev', () => {
  isLocalDev = true;
});

gulp.task('build-js', () => {
  return browserify({
    entries: ['./js/app.js'],
    debug: isProduction,
  }).transform(babelify, { presets: ['es2015', 'react'] })
    .transform('brfs')
    .bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    .pipe(uglify()) // now gulp-uglify works
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulpif(isLocalDev, gulp.dest('./../api/app/static/dist')));
});

gulp.task('postcss', () => {
  // Runs postCSS with all its plugins.
  const nano = require('gulp-cssnano');
  const plugins = [
    require('autoprefixer'),
  ];
  // Run PostCSS
  return gulp.src('./stylesheets/styles.css')
      .pipe(postcss(plugins))
      .on('error', (error) => {
        gutil.log(gutil.colors.magenta.bold('Error while compiling CSS'));
        gutil.log(gutil.colors.magenta(error.message));
      })
      .pipe(gulp.dest('./dist'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(nano({ discardUnused: false }))
      .pipe(gulp.dest('./dist'))
      .pipe(gulpif(isLocalDev, gulp.dest('./../api/app/static/dist')));
});

gulp.task('watch-styles', function watchStyles() {
  // Watches the stylesheet folders for changes and runs the 'postcss' task if a change occurs.
  gulp.watch(['./stylesheets/**/*.css'], ['postcss']);
  return;
});

gulp.task('watch-js', function watchStyles() {
  // Watches the stylesheet folders for changes and runs the 'postcss' task if a change occurs.
  gulp.watch(['./js/**/*.js'], ['build-js']);
  return;
});

gulp.task('default', [
  'is-local-dev',
  'postcss',
  'build-js',
  'watch-styles',
  'watch-js',
]);


gulp.task('build', [
  'postcss',
  'build-js',
]);

gulp.task('build-production', [
  'is-production',
  'postcss',
  'build-js',
]);
