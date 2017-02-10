import trash from 'trash'
import * as logger from './common/logger'

export default function (config, cb) {
  trash(config.tasks.clean.files).then((test) => {
    logger.info('Moved files into trash', test)
    return cb()
  }, function (err) {
    logger.error('Clean: Could not move files to trash', err)
  }, function (update) {
    logger.info('Clean: No Files found too omve in trash', update)
  })
}
