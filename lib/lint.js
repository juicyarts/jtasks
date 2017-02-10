import standard from 'gulp-standard'

export default function (gulp, config) {
  return gulp.src(config.files)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: false
    }))
}
