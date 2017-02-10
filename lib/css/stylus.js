import stylint from 'gulp-stylint'
import stylus from 'gulp-stylus'
import nib from 'nib'
import cssnano from 'gulp-cssnano'
import rename from 'gulp-rename'

export function lint (gulp, config) {
  return gulp.src(config.files)
    .pipe(stylint())
    .pipe(stylint.reporter())
    .pipe(stylint.reporter('fail', {
      failOnWarning: false,
      failOnError: true
    }))
}

export function process (gulp, config) {
  return gulp.src(config.files)
    .pipe(stylus({
      use: nib(),
      compress: config.outputStyle === 'compressed'
    }))
    .pipe(cssnano())
    .pipe(rename(config.outputName))
    .pipe(gulp.dest(config.outputPath))
}
