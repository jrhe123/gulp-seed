var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');



// Ex: 1
// gulp.task('browserSync', function() {
//   browserSync({
//     server: {
//       baseDir: ''
//     },
//   })
// });

// gulp.task('lint', function() {
//     gulp.src('./js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// gulp.task('sass', function() {
//     gulp.src('./scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

// gulp.task('scripts', function() {
//     gulp.src('./js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('./dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist'));
// });

// gulp.task('default', function(){
//     gulp.run('lint', 'sass', 'scripts');

//     gulp.watch('./js/*.js', function(){
//         gulp.run('lint', 'sass', 'scripts');
//     });

//     gulp.watch('./scss/*.scss', ['sass']);
// });


// Ex: 2
// gulp.task('sass', function(){
//   return gulp.src('app/scss/styles.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('app/css'))
// });
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(uglify())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browserSync', 'sass'],function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});