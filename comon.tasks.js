// Util
// These Includes are node dependencies needed in this file.
import gulp from 'gulp'
import rs from 'run-sequence'
import bro from 'browser-sync'

// Lib
// These Includes are Task or Library dependencies.
// Some use external gulp tasks or node modules.
// Others are written by us
import * as logger from './lib/common/logger'
import clean from './lib/common/clean'
import doc from './lib/doc'

import jslint from './lib/lint'
import uglify from './lib/uglify'

import * as sass from './lib/css/sass'
import * as stylus from './lib/css/stylus'

import server from './lib/server'
import inject from './lib/inject'

import karma from './lib/test/karma'
import nightwatch from './lib/test/nightwatch'
import galen from './lib/test/galen'
import * as protractor from './lib/test/protractor'
import * as mocha from './lib/test/mocha'

import { watch, run } from './lib/watcher'
import build from './lib/build'

import fsIn from './lib/common/fsInheritanceLib'
import fInject from './lib/common/fInject'

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

  if (config.tasks.clean) {
    gulp.task('clean', (done) => {
      clean(config.tasks.clean, () => {
        done()
      })
    })
  }

  gulp.task('doc', done => {
    if (config.tasks.doc) {
      doc(gulp, config.tasks.doc, done)
    }
  })

  if (config.tasks.js) {
    if (config.tasks.js.lint) {
      gulp.task('lint', () => {
        return jslint(gulp, config.tasks.js.lint)
      })
    }

    if (config.tasks.js.uglify) {
      gulp.task('uglify', () => {
        return uglify(gulp, config.tasks.js.uglify)
      })
    }

    if (config.tasks.js.lint && config.tasks.js.uglify) {
      gulp.task('js', done => {
        return rs('lint', 'uglify', () => {
          done()
        })
      })
    } else if (config.tasks.js.lint && !config.tasks.js.uglify) {
      gulp.task('js', done => {
        return rs('lint', () => {
          done()
        })
      })
    }
  }

  if (config.tasks.css) {
    if (config.tasks.css.process.preprocessor === 'sass') {
      gulp.task('css:lint', () => {
        if (config.tasks.css.lint) {
          return sass.lint(gulp, config.tasks.css.lint)
        }
      })
      gulp.task('css:process', () => {
        return sass.process(gulp, config.tasks.css.process)
      })
      gulp.task('css', () => {
        return rs('css:lint', 'css:process')
      })
    }
    if (config.tasks.css.process.preprocessor === 'stylus') {
      gulp.task('css:lint', () => {
        if (config.tasks.css.lint) {
          return stylus.lint(gulp, config.tasks.css.lint)
        }
      })
      gulp.task('css:process', () => {
        return stylus.process(gulp, config.tasks.css.process)
      })
      gulp.task('css', () => {
        return rs('css:lint', 'css:process')
      })
    }
  }

  if (config.tasks.test) {
    // unit testing tasks
    var testTasks = []

    if (config.tasks.test.unit) {
      gulp.task('test:unit:watch', done => {
        karma(config.tasks.test.unit.dev, 'watch', cwd, done)
      })
      gulp.task('test:unit:run', done => {
        karma(config.tasks.test.unit.dev, 'run', cwd, done)
      })
      gulp.task('test:unit:build', done => {
        karma(config.tasks.test.unit.build, 'run', cwd, done)
      })
      testTasks.push('test:unit:build')
    }
    if (config.tasks.test.mocha) {
      gulp.task('test:mocha', () => {
        return mocha.run(config, gulp)
      })

      gulp.task('test:mocha:watch', () => {
        return mocha.watch(config, gulp)
      })

      testTasks.push('test:mocha')
    }

    if (config.tasks.test.e2e) {
      if (config.tasks.test.e2e.protractor) {
        gulp.task('protractor:install', done => {
          return protractor.install(done)
        })
        gulp.task('protractor:run', done => {
          return protractor.run(done)
        })
        gulp.task('test:e2e:protractor', done => {
          return rs('protractor:install', 'protractor:run', () => {
            done()
          })
        })
        testTasks.push('test:e2e:protractor')
      }

      if (config.tasks.test.e2e.galen) {
        gulp.task('test:e2e:galen', done => {
          return galen(gulp, config.tasks.test.e2e.galen, done)
        })
        testTasks.push('test:e2e:galen')
      }

      if (config.tasks.test.e2e.nightwatch) {
        gulp.task('test:e2e:nightwatch', () => {
          return nightwatch(gulp, config)
        })
        testTasks.push('test:e2e:nightwatch')
      }
    }

    gulp.task('test', done => {
      return rs.apply(null, testTasks)
    })
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

  gulp.task('server', () => {
    return server(bro, config)
  })

  if (config.tasks.inject && config.tasks.inject.dev) {
    gulp.task('inject:dev', done => {
      inject(config.tasks.inject, 'dev', () => {
        done()
      })
    })
  }

  gulp.task('inject:build', done => {
    if (config.tasks.inject && config.tasks.inject.build) {
      inject(config.tasks.inject, 'build', () => {
        done()
      })
    }
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
