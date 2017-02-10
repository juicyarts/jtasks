import sass from 'gulp-ruby-sass'
import cssnano from 'gulp-cssnano'
import sassLint from 'gulp-sass-lint'

import fsIn from '../common/fsInheritanceLib'

export function lint (gulp, config) {
  return gulp.src(config.files)
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
}

export function process (gulp, config) {
  let loadPaths = config.inheritance ? fsIn.findPaths(config.inheritance, config.inheritance.paths) : ''
  let sassOptions = {
    loadPath: loadPaths,
    defaultEncoding: 'UTF-8',
    style: config.outputStyle
  }

  return sass(config.files, sassOptions)
    .on('error', function (err) {
      throw new Error('Sass Error occured:', err)
    })
    .pipe(cssnano())
    .pipe(gulp.dest(config.outputPath))
}
