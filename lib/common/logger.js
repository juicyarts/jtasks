import chalk from 'chalk'

let config
let selector = 'logger | '

/**
 * @module logger
 * @description
 * The logger is a global logging utility
 * It uses console log with different colors to show logs, errors, warnings, infos and debug
 * @example
// how to import it
var logger = require('route/from/your/location/tasks/common/logger')
// or
import logger from 'route/from/your/location/tasks/common/logger'
 */

/**
 * Configure Logger
 * @example
config = {
  selectors: ['mocha', 'test'],
  levels: ['success', 'warn', 'info', 'debug', 'error']
}
logger.configure(config)
// sets values for the logger config
// and the selectors to be display in the log
// i use the selectors for project name and type mostly
// if none given its just 'logger |'
 * @param {Object} cfg containing looger config
 */
export function configure (cfg) {
  if (cfg) {
    config = cfg
    this.setSelector(config.selectors)
  }
}

/**
 * sets the selectors to be displayed
 * @example
 * logger.setSelector(['foo', 'bar', 'baz'])
 * // will show foo | bar | baz at the beginning of the logger
 * @param {Array} selectors Array of selectors to be shown
 */
export function setSelector (selectors) {
  var sel = ''
  this.selector = ''
  if (selectors && selectors.length > 0) {
    for (var i = 0; i < selectors.length; i++) {
      sel += selectors[i] + ' | '
    }
  } else {
    sel = 'no Selector'
  }
  this.selector = sel
}

/**
 * Log Success
 * can have key and value parameters
 * @example
let key = 'foo'
let value = 'bar'
logger.success(key, value)
// logs: [logger | Success] bar baz
// the part in brackets is highlighted in green, the key is also green, the value is plain
 * @param  {string} key
 * @param  {string} value [description]
 */
export function success (key, value) {
  if (config.levels.indexOf('success') > -1) {
    console.log(chalk.bgGreen.dim.black(' ' + selector + 'Success '), chalk.green(key), value || '')
  }
}

/**
 * Log Info
 * can have key and value parameters
 * @example
let key = 'foo'
let value = 'bar'
logger.info(key, value)
// logs: [logger | Info] bar baz
// the part in brackets is highlighted in blue, the key is blue, the value is plain
 * @param  {string} key
 * @param  {string} value [description]
 */
export function info (key, value) {
  if (config.levels.indexOf('info') > -1) {
    console.log(chalk.bgBlue.dim.black(' ' + selector + 'Info '), chalk.blue(key), value || '')
  }
}

/**
 * Log Warning
 * can have key and value parameters
 * @example
let key = 'foo'
let value = 'bar'
logger.warn(key, value)
// logs: [logger | Warning] bar baz
// the part in brackets is highlighted in yellow, the key is yellow, the value is plain
 * @param  {string} key
 * @param  {string} value [description]
 */
export function warn (key, value) {
  if (config.levels.indexOf('warn') > -1) {
    console.log(chalk.bgYellow.dim.black(' ' + selector + 'Warning '), chalk.yellow(key), value || '')
  }
}

/**
 * Log Error
 * can have key and value parameters
 * @example
let key = 'foo'
let value = 'bar'
logger.error(key, value)
// logs: [logger | Error] bar baz
// the part in brackets is highlighted in red, the key is red, the value is plain
 * @param  {string} key
 * @param  {string} value [description]
 */
export function error (key, value) {
  if (config.levels.indexOf('error') > -1) {
    console.log(chalk.bgRed.dim.black(' ' + selector + 'Error '), chalk.red(key), value || '')
  }
}

/**
 * Log Debug
 * can have key and value parameters
 * @example
let key = 'foo'
let value = 'bar'
logger.error(key, value)
// logs: [logger | Debug] bar baz
// the part in brackets is highlighted in cyan, the key is cyan, the value is plain
 * @param  {string} key
 * @param  {string} value [description]
 */
export function debug (key, value) {
  if (config.levels.indexOf('debug') > -1) {
    console.log(chalk.bgCyan.dim.black(' ' + selector + 'Debug '), chalk.cyan(key), value || '')
  }
}
