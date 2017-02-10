import ntw from 'gulp-nightwatch'
import path from 'path'

export default function (gulp, config) {
  return gulp.src('').pipe(ntw({
    configFile: path.join(__dirname, '../../configs/nightwatch.conf.js')
  }))
}
