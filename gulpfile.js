var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var stylelint = require('gulp-stylelint');
var prettify = require('gulp-html-prettify');

gulp.task('html', function () {
  return gulp.src('./source/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(prettify({
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('css', function () {
  return gulp.src('./source/less/style.less')
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function () {
  return gulp.src('./source/js/script.js')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('images', function () {
  return gulp.src('./source/images/*')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', function () {
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/less/**/*.less', ['css']);
  gulp.watch('source/js/**/*.js', ['js']);
  gulp.watch('source/images/*', ['images']);
});

gulp.task('clean', function () {
  return del(['build/**/*']);
});

gulp.task('stylelint-fix', function () {
  return gulp.src('./source/less/**/*.less')
    .pipe(stylelint({
      fix: true
    }))
    .pipe(gulp.dest('./source/less/'));
});

gulp.task('default', gulpSequence('clean', 'stylelint-fix', ['html', 'css', 'js', 'images']));
