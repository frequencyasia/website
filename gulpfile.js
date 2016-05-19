'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash').assign;
var brfs = require('brfs');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var doiuse = require('doiuse');

// add custom browserify options here
var customOpts = {
  entries: ['./js/app.js'],
  debug: true,
  transform: [brfs, [babelify, {presets: ["es2015"]}]],
};
var b = browserify(customOpts);

gulp.task('watch-js', bundleAndWatch);
gulp.task('js', bundle);

function bundleAndWatch() {
  var watchify = require('watchify');
  var opts = assign({}, watchify.args, customOpts);
  var w = watchify(browserify(opts));
  w.on('update', bundle); // on any dep update, runs the bundler
  w.on('log', gutil.log); // output build logs to terminal
  return w.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify())
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify())
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('postcss', function() {
  // Runs postCSS with all its plugins.
  var nano = require('gulp-cssnano');
  var plugins = [
    require('autoprefixer'),
    doiuse({
      browsers: [
        'ie >= 8',
        '> 1%'
      ],
      // ignore: ['vh'], // an optional array of features to ignore
      // ignoreFiles: ['**/normalize.css'], // an optional array of file globs to match against original source file path, to ignore
      onFeatureUsage: function (usageInfo) {
        console.log(usageInfo.message)
      }
    }),
  ];
  // Run PostCSS
  return gulp.src('./stylesheets/styles.css')
      .pipe(postcss(plugins))
      .on('error', function(error) {
        gutil.log(gutil.colors.magenta.bold('Error while compiling CSS'));
        gutil.log(gutil.colors.magenta(error.message));
      })
      .pipe(gulp.dest('./dist'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(nano({ discardUnused: false }))
      .pipe(gulp.dest('./dist'))
      .pipe(function onComplete() {
        return notify({ message: 'PostCSS has finished compiling.' });
      }());
});

gulp.task('watch-styles', function watchStyles() {
  // Watches the stylesheet folders for changes and runs the 'postcss' task if a change occurs.
  gulp.watch(['./stylesheets/*.css'], ['postcss']);
  return;
});

gulp.task("default", [
  'postcss',
  'watch-styles',
  "watch-js",
]);

gulp.task("build", [
  'postcss',
  "js",
]);