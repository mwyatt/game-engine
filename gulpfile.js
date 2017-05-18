var gulp = require('gulp')
var gutil = require('gutil')
var tap = require('gulp-tap')
var watch = require('gulp-watch')
var browserify = require('browserify')
var domain = require('domain')
var buffer = require('gulp-buffer')

gulp.task('default', function() {
  gutil.log('watching...')
  watch('ui/**/*.js', buildJs)
})

gulp.task('buildJs', function() {
  return buildJs()
})

function buildJs() {
  return gulp.src('ui/**/*.bundle.js', {read: false})
  .pipe(tap(function(file) {
    var d = domain.create()
    d.on("error", function(err) {
      gutil.log('Error -> ' + err.message + ' -> in file -> ' + file.path)
    })
    d.run(function() {
      file.contents = browserify(file.path, {debug: true}).bundle()
    })
    gutil.log(Date.now() + ' -> build')
  }))
  .pipe(buffer())
  .pipe(gulp.dest('asset'))
}
