import gulp from 'gulp'
import * as logger from './lib/logger'
import rs from 'run-sequence'

// import _ from 'lodash'
// import rs from 'run-sequence'
import bro from 'browser-sync'
import server from './lib/server'

// assets
import fsIn from './lib/common/fsInheritanceLib'

// clean
import clean from './lib/clean'
// doc
import doc from './lib/doc'
// inject
import inject from './lib/inject'
// lint
import jslint from './lib/lint'
import uglify from './lib/uglify'
// css
import css from './lib/css'

// test
import { unitTest } from './lib/unit'
import { nightwatch, protractorRun, protractorInstall } from './lib/e2e'
import { mochaRun, mochaWatch } from './lib/mocha'

// watch
import { watch, run } from './lib/watcher'

// build
import build from './lib/build'

/**
 * Tasks is the task Library given to every project wich includes
 * this into their gulpfile
 *
 * @param  {Object} config Javascript Object given Application.confjs
 * @param  {String} cwd    Current Working Directory
 * @return {Function} containing Tasks
 */
function tasks (config, cwd) {
  logger.configure(config.tasks.log)

  // Cleanup task
  if (config.tasks.clean) {
    gulp.task('clean', () => {
      return clean(config, cwd)
    })
  }

  if (config.tasks.doc) {
    // documentation task
    gulp.task('doc', () => {
      return doc(gulp, config)
    })
  }

  // Testing Tasks
  if (config.tasks.test) {
    // unit testing tasks
    if (config.tasks.test.unit) {
      gulp.task('test:unit:watch', done => {
        return unitTest(config, 'dev', 'watch', cwd, done)
      })
      gulp.task('test:unit:run', done => {
        return unitTest(config, 'dev', 'run', cwd, done)
      })
      gulp.task('test:unit:build', done => {
        return unitTest(config, 'build', 'run', cwd, done)
      })
    }

    if (config.tasks.test.mocha) {
      gulp.task('test:mocha', () => {
        return mochaRun(config, gulp)
      })
      gulp.task('test:mocha:watch', () => {
        return mochaWatch(config, gulp)
      })
    }
    if (config.tasks.test.e2e) {
      if (config.tasks.test.e2e.framework === 'protractor') {
        gulp.task('protractor:install', done => {
          return protractorInstall(done)
        })
        gulp.task('protractor:run', done => {
          return protractorRun(done)
        })
        gulp.task('test:e2e', done => {
          return rs('protractor:run', () => {
            done()
          })
        })
        gulp.task('test:e2e:watch', () => {
          gulp.watch('./test/e2e/**', ['protractor:run'])
        })
      } else {
        gulp.task('test:e2e', done => {
          return nightwatch(gulp, config, done)
        })
      }
    }

    if (config.tasks.test.unit && config.tasks.test.e2e) {
      gulp.task('test', done => {
        return rs('test:unit:run', 'test:e2e', () => {
          done()
        })
      })
    } else if (config.tasks.test.unit && !config.tasks.test.e2e) {
      gulp.task('test', done => {
        return unitTest(config, 'dev', 'run', cwd, done)
      })
    }
  }

  if (config.tasks.inject) {
    // Inject
    gulp.task('inject:prod', () => {
      return inject(gulp, config, true)
    })
    gulp.task('inject:dev', () => {
      return inject(gulp, config, false)
    })
  }

  if (config.tasks.js) {
    if (config.tasks.js.lint) {
      // Javascript
      gulp.task('lint', () => {
        return jslint(gulp, config)
      })
    }

    if (config.tasks.js.minify) {
      gulp.task('uglify', () => {
        return uglify(gulp, config)
      })
      gulp.task('js', () => {
        rs('lint', 'uglify')
      })
    }
  }

  gulp.task('build', done => {
    return build(rs, () => {
      done()
    })
  })

  // unbuild
  gulp.task('unbuild', done => {
    return rs('clean', 'inject:dev', () => {
      done()
    })
  })

  // css
  gulp.task('css', () => {
    return css(gulp, config)
  })

  gulp.task('server', () => {
    return server(bro, config)
  })

  // default watcher task
  gulp.task('run', () => {
    return run(rs, config)
  })

  gulp.task('default', ['run'], () => {
    return watch(gulp, rs, bro, config)
  })
}

export default tasks
