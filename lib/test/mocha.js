import mocha from 'gulp-mocha'
import rs from 'run-sequence'

// import some turkish citys here because reasons (istanbul is a coverage reporter, isparta is an addition for es2015/es6)
import istanbul from 'gulp-istanbul'
// can't be imported via import, whyever.. :S'
var isparta = require('isparta')

export function run (config, gulp) {
  preTest(config, gulp)
  return gulp.src(config.tasks.test.mocha.test, {
    read: false
  })
    .pipe(mocha({
      reporter: config.tasks.test.mocha.reporter || 'spec',
      timeout: 5000
    }))
    .pipe(mocha({
      reporter: 'mocha-junit-reporter',
      timeout: 5000,
      reporterOptions: {
        mochaFile: './docs/junit/mochaReport.xml'
      }
    }))
    .pipe(istanbul.writeReports({
      dir: 'docs/coverage',
      reporters: ['cobertura', 'text-summary', 'html']
    }))
}

export function watch (config, gulp) {
  return gulp.watch(config.tasks.test.mocha.test, ['test:mocha']).on('change', () => {
    return rs('test:mocha')
  })
}

export function preTest (config, gulp) {
  return gulp.src(config.tasks.test.mocha.src)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire())
}
