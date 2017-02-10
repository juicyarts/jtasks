import inject from './inject'
import chokidar from 'chokidar'
import * as logger from './common/logger'

export function watch (gulp, rs, bro, config) {
  logger.info('watcher initialized')

  if (config.tasks.js) {
    if (config.tasks.js.lint) {
      gulp.watch(config.tasks.js.lint.files, ['lint'])
    }
    if (config.tasks.doc) {
      gulp.watch(config.tasks.js.lint.files, ['doc'])
    }
  }

  if (config.tasks.watcher) {
    if (config.tasks.watcher.refresh) {
      if (config.tasks.css) {
        gulp.watch(config.tasks.watcher.refresh, ['css']).on('change', () => {
          return rs('css', () => {
            bro.get('appServer').reload('*.css')
          })
        })
      } else {
        gulp.watch(config.tasks.watcher.refresh).on('change', () => {
          bro.get('appServer').reload('*.css')
        })
      }
    }

    if (config.tasks.watcher.reload) {
      gulp.watch(config.tasks.watcher.reload).on('change', () => {
        logger.info('reload browser')
        bro.get('appServer').reload()
      })
    }

    if (config.tasks.watcher.rebuild) {
      gulp.watch(config.tasks.watcher.rebuild, ['inject:dev'])
    }
  }
}

export function run (rs, config) {
  return rs('server')
}
