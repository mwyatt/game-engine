var settings = {
  isLocal: true,
  assetDest: 'asset/',
  watch: {
    css: 'css/**/*.css',
    js: 'js/**/*.js'
  },
  js: 'js/'
};

var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var runSequence = require('run-sequence');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var buffer = require('gulp-buffer');

gulp.task('default', build);
gulp.task('watch', watch);
gulp.task('js', js);
gulp.task('jsMin', jsMin);
gulp.task('jsTidy', jsTidy);

function build() {
  runSequence(
    'js',
    'jsMin'
  );
}

function watch() {
  gulp.watch(settings.watch.js, ['js']);
}

function js() {
  return gulp.src(settings.js + '**/*.bundle.js', {read: false})
    .pipe(tap(function(file) {
      file.contents = browserify(file.path, {debug: settings.isLocal})
        .bundle();
      gutil.log('build ' + file.path);
    }))
    .pipe(buffer())
    .pipe(gulp.dest(settings.assetDest));
};

function jsMin() {
  return gulp.src(settings.assetDest + '**.js')
    .pipe(uglify())
    .pipe(tap(function(file) {
      gutil.log('minify ' + file.path);
    }))
    .pipe(gulp.dest(settings.assetDest));
}

function jsTidy() {
  return gulp.src([settings.js + '**/*.js'])
    .pipe(jscs({
      configPath: 'gulp/.jsTidyGoogle.json',
      fix: true
    }))
    .pipe(gulp.dest('js'));
}
