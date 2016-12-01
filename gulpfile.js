const gulp = require ('gulp')
const sass = require ('gulp-sass')
const nodemon = require ('gulp-nodemon')


// gulp.task('build-css', function(){
//   return gulp.src('static/scss/styles.scss')
//     .pipe(sass()) // Converts Sass to CSS with gulp-sass
//     .pipe(gulp.dest('static/css'))
// });

// /* updated watch task to include sass */
// gulp.task('watch', function() {
//   gulp.watch('static/scss/styles.scss', ['build-css']);
// })


gulp.task('sass', function(){
  return gulp.src('static/scss/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('static/css'))
})

gulp.task('watch', function(){
  return gulp.watch('static/scss/styles.scss', ['sass']);
})

gulp.task('serve', function(){
  return nodemon({
    script: 'app.js',
  }).on('start', ['watch'])
  .on('change', ['watch'])
  .on('restart', function(){
      console.log('restarted');
    })
})