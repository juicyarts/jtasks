// Built in packages.
import cp from 'child_process'
// Generic npm packages.
import async from 'async'
// The gulp related plugins.
import tap from 'gulp-tap'
// Logger
import * as logger from '../common/logger'

import path from 'path'

// The port on which the local server should serve up the reports on.
let reportsDir = 'docs/galenreport'
let configDir = path.join(__dirname, '../../configs/galen.config')
// A `glob` for where the Galen test suites can be found.

export default function (gulp, config, done) {
  let suitesGlob = config.files

  logger.info('starting galen')

  let files = []
  // Here we define a simple utility Function that we will call to
  // execute the Galen specs.
  let galen = function galen (file, callback) {
    cp.spawn('galen', [
      'test',
      file.path,
      '--htmlreport',
      reportsDir + '/' + file.relative.replace(/\.test/, ''),
      '--config',
      configDir
    ], {
      'stdio': 'inherit'
    }).on('close', function (code) {
      callback(code === 0)
    })
  }

  // Here we source our suites and immediately pass them to `gulp-tap`. The
  // `gulp-tap` plugin allows you to "tap into" each file that is streamed
  // into the pipe. We use this functionality to build up the `files` Array
  // and populate it with vinyl File Objects.
  //
  // Once `gulp-tap` has finished
  // doing its thing, we listen to the `end` event and then pass off the built
  // up `files` Array to `async.mapSeries`.
  //
  // This will sequentially iterate through the Array perform the first
  // callback and then when all items in the Array have been iterated over, it
  // will perform the next callback.
  //
  // The next callback executes the `done()` handler that tells gulp that we
  // are finished with this task and that we are good to continue with
  // whichever task in next in the queue.
  gulp.src([suitesGlob])
    .pipe(tap(function (file) {
      files.push(file)
    }))
    .on('end', function () {
      async.rejectSeries(files, function (file, finished) {
        galen(file, finished)
      }, function (errors) {
        if (errors && errors.length > 0) {
          done('Galen reported failed tests: ' + (errors.map(function (f) { return f.relative }).join(', ')))
        } else {
          done()
        }
      })
    })
}
