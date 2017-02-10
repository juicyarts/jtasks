import * as logger from './logger'
import path from 'path'
import fs from 'fs'

/**
 * @module fInject
 * @description
 * fInject - FileInjector
 * This Module allows you to inject content into given templates by setting placeholders that
 * are then replaced or used to prepend or append the content you pass
 */

/**
 * @description
 * Internal error handler. Checks for errors in given config
 *
 * @export
 * @param {Object} config
 * @returns {Boolean}
 */
export function checkForErrors (config) {
  if (!config || !config.inputType || !config.inputFile || !config.inputSelector || !config.input || !config.injectType || !config.outputPath || !config.outputName) {
    logger.error('Configuration Error!')
    logger.debug('Following keys are needed', {
      inputType: 'STRING|NUMBER|ARRAY',
      inputFile: 'value',
      intputSelector: 'value',
      input: 'value',
      injectType: 'append',
      outputPath: 'value',
      outputName: 'value'
    })
  }
  if (!fs.existsSync(config.inputFile)) {
    logger.error('given inputFile doesnt exist')
    return true
  }
  if (!fs.existsSync(path.join(process.cwd(), config.outputPath))) {
    logger.error('given outputPath doesnt exist')
    return true
  }
  if (!config.disableTypeCheck && typeof config.input !== config.inputType) {
    logger.error('given inputType and input doent match')
    logger.debug('missmatch', {
      expectedType: config.inputType,
      foundType: typeof config.input
    })
    return true
  }
  return false
}

/**
 * @description
 * The Write function takes a config and a callback function.
 * It checks the config and runs the inject logic thats needed
 * @export
 * @param {Object} config
 * @param {Function} cb Callback
 */
export function write (config, cb) {
  if (checkForErrors(config)) return
  var body = fs.readFileSync(config.inputFile).toString()
  if (body.indexOf(config.inputSelector) < 0) {
    logger.error('Selector: ' + config.inputSelector + ' not found in file')
    return
  }
  if (config.inputType === 'string' || config.inputType === 'integer') {
    writeStringInFile(config, body)
  } else {
    writeArrayInFile(config, body)
  }
  if (cb) {
    cb()
  }
}

export function makeRegExFromSelector (selector) {
  return new RegExp(selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')
}

/**
 * @description
 * WriteStringInFile writes a string into a file when given placeholder is found
 * @export
 * @param {Object} config
 * @param {String} body
 * @param {String} re String or Retular Expression thats used for the inject
 */
export function writeStringInFile (config, body) {
  var re = makeRegExFromSelector(config.inputSelector)
  if (config.injectType === 'append') {
    body = body.replace(re, '$&\n' + config.input + (config.newLine ? '\n' : ''))
  } else if (config.injectType === 'prepend') {
    body = body.replace(re, config.input + (config.newLine ? '\n$&' : '$&'))
  } else {
    body = body.replace(re, config.input + (config.newLine ? '\n' : ''))
  }
  fs.writeFileSync(path.join(process.cwd(), config.outputPath, config.outputName), body)
}

export function writeArrayInFile (config, body) {
  var re = makeRegExFromSelector(config.inputSelector)
  var input = ''
  for (var i = 0, len = config.input.length; i < len; i++) {
    input += makeTagFromInput(config, config.input[i]) + '\n'
  }
  if (config.injectType === 'append') {
    body = body.replace(re, '$&' + '\n' + input)
  } else if (config.injectType === 'prepend') {
    body = body.replace(re, input + '$&')
  } else {
    body = body.replace(re, input)
  }
  fs.writeFileSync(path.join(process.cwd(), config.outputPath, config.outputName), body)
}

export function makeTagFromInput (config, input) {
  if (input.indexOf('.js') > -1) {
    return '<script type="text/javascript" src="' + input + '"></script>'
  } else if (input.indexOf('.css') > -1) {
    return '<link type="text/css" rel="stylesheet" href="' + input + '"></link>'
  } else {
    return '<script type="text/javascript" src="' + input + '"></script>'
  }
}
