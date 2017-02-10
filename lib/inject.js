import path from 'path'
import fs from 'fs'

import * as logger from './common/logger'
import fsIn from './common/fsInheritanceLib'
import * as fInject from './common/fInject'

export default function (config, env, done) {
  let sourcesString = ''
  let version = new Date().getTime()
  let target, sources

  let fsInConfig = Object.assign({
    loglevel: ['warn'],
    removePatternFromFileName: /^((..\/){0,2}[a-z]*\/){0,1}static\/js\//,
    replaceWith: '{static:js:',
    replaceAppend: '}'
  }, config[env])

  if (env === 'build') {
    sources = config[env].files
  } else {
    sources = fsIn.findFiles(fsInConfig, config[env].files)
  }

  let fInjectConfig = Object.assign({
    inputType: 'array',
    disableTypeCheck: true,
    inputFile: path.join(__dirname, '../templates/inject.tmpl'),
    inputSelector: '<!-- inject:js -->',
    input: sources,
    injectType: 'append'
  }, config)

  fInject.write(fInjectConfig, () => {
    logger.info('Injecting ' + sources.length + ' file(s) into js.tmpl')
    done()
  })
}
