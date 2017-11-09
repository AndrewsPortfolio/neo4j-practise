var gulp = require('gulp'), minify = require('gulp-minify'), watch = require('gulp-watch'), sass = require('gulp-sass') ,concat = require('gulp-concat');

var jsLoc = './htdocs/js/';
var cssLoc = './htdocs/css/';
var scssLoc = './scss/*.scss';

var jsFiles = [
  './node_modules/neo4j-driver/lib/browser/neo4j-web.min.js',
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/popper.js/dist/umd/popper.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.min.js',
  // './htdocs/js/app.js'
];

var scssFiles = [
    './node_modules/bootstrap/scss/**/*.scss',
];

gulp.task('compilejs', function () {
   return gulp.src(jsFiles)
   .pipe(concat('bundle.js'))
   .pipe(minify({ ext:{src:'.js', min:'.min.js'}}))
   .pipe(gulp.dest(jsLoc))
});

gulp.task('compilecss', function () {
   return gulp.src(scssFiles)
   .pipe(sass())
   .pipe(concat('bundle.css'))
  //  .pipe(cleanCSS())
  //  .pipe(concat('bundle.min.css'))
   .pipe(gulp.dest(cssLoc))
});

gulp.task('js_watch', function () {
    gulp.watch(jsLoc + 'app.js', ['compilejs']);
});

gulp.task('css_watch', function () {
    gulp.watch(scssFiles, ['compilecss']);
});

gulp.task('default', ['compilejs', 'js_watch', 'compilecss', 'css_watch']);
