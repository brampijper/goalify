const gulp = require ('gulp')
const sass = require ('gulp-sass')


gulp.task('sass', function(){
  return gulp.src('static/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('static/css'))
});