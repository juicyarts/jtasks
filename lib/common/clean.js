import trash from 'trash'
import * as logger from './logger'

/**
 * @module clean
 */

/**
 * @description
 * unfortunately jsdoc goes a little crazy on single module exports
 * so just look at the example please and ignore the require line above this
 * @export
 * @example
// how to import it
var clean = require('route/from/your/location/tasks/common/clean')
// or
import clean from 'route/from/your/location/tasks/common/clean'
var config = {
 files: [
  'foo/bar/baz/**',
  'foo/barfoo/*.js'
  'foo/barfoo/** /*.js' // the space is just becasue jsdoc has issues with this
 ]
}
clean(config, function(){
 console.log('do something after removal')
})
 * @param {Object} config a Config Object
 * @param {Function} cb a Callback Function
 */
export default function (config, cb) {
  trash(config.files).then(() => {
    logger.info('Moved files into trash')
    cb()
  }, function (err) {
    logger.error('Clean: Could not move files to trash', err)
  }, function (update) {
    logger.info('Clean: No Files found too omve in trash', update)
  })
}
