// Logger
import * as logger from './common/logger'

export default function (rs, done) {
  return rs(
    'clean',
    'js',
    'doc',
    'inject:build',
    'test',
    function () {
      logger.success('build succeeded !')
      done()
    })
}
