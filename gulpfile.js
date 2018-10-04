const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const gulpDebug = require('gulp-debug');

const isDev = false;

gulp.task('less', function(){
  return gulp.src('development/less/**/*.less')
  .pipe(gulpDebug( {title: 'src'} ))
  .pipe(gulpIf( isDev, sourcemaps.init() ))
  .pipe(gulpDebug( {title: 'sourcemaps'} ))
  .pipe(autoprefixer())
  .pipe(gulpDebug({title: 'autoprefixer'}))
  .pipe(less())
  .pipe(gulpDebug({title: 'less'}))
  .pipe(concat('bundle.css'))
  .pipe(gulpDebug({title: 'concat'}))
  .pipe(gulpIf(isDev, cleanCss()))
  .pipe(gulpDebug({title: 'cleanCss'}))
  .pipe(gulpIf( isDev, sourcemaps.write() ))
  .pipe(gulpDebug({title: 'gulpIf'}))
  .pipe(gulp.dest('public'));
});


gulp.task('html', function() {
  return gulp.src('development/*.html')
    .pipe(gulp.dest('public'));
});
gulp.task('bootstrap', function() {
  return gulp.src('development/bootstrap/*.css')
    .pipe(gulp.dest('public'));
});

gulp.task('watch:less', function(){
  gulp.watch('development/less/**/*.less', ['less']);
});

gulp.task('default', ['less', 'html', 'watch:less', 'bootstrap']);
