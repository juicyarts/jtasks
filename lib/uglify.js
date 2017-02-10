import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import stripDebug from 'gulp-strip-debug'
import gulpif from 'gulp-if'

export default function (gulp, config) {
  return gulp.src(
    config.files
  )
    .pipe(concat(config.outputName))
    .pipe(gulpif(config.options.removeLogs, stripDebug()))
    .pipe(uglify(config.options))
    .pipe(gulp.dest(config.outputPath))
}
