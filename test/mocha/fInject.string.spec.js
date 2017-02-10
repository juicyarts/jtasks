import chai from 'chai'
import mockFs from 'mock-fs'
import fs from 'fs'
import path from 'path'

import * as fInject from '../../lib/common/fInject'

let expect = chai.expect
let config

describe('Inject String', () => {
  afterEach(() => {
    mockFs.restore()
  })
  describe('writeStringInFile', () => {
    describe('input String | timestamp | multiple', () => {
      beforeEach(() => {
        mockFs({
          'foo/bar': {
            'in.js': 'var timestamp1 = "[TIMESTAMP]";var timestamp2 = "[TIMESTAMP]";'
          }
        })
        config = {
          inputType: 'integer',
          inputFile: 'foo/bar/in.js',
          inputSelector: '[TIMESTAMP]',
          input: new Date().getTime(),
          injectType: 'replace',
          outputPath: 'foo/bar',
          outputName: 'out.js',
          newLine: false
        }
      })
      it('should replace', () => {
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeStringInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal('var timestamp1 = "' + config.input + '";var timestamp2 = "' + config.input + '";')
      })
    })

    describe('input String | html tag', () => {
      beforeEach(() => {
        mockFs({
          'foo/bar': {
            'in.tmpl': '<!-- inject:body-start -->'
          }
        })
        config = {
          inputType: 'string',
          inputFile: 'foo/bar/in.tmpl',
          inputSelector: '<!-- inject:body-start -->',
          input: '<body>',
          injectType: 'append',
          outputPath: 'foo/bar',
          outputName: 'out.tmpl',
          newLine: true
        }
      })
      it('should append', () => {
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeStringInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal('<!-- inject:body-start -->\n' + config.input + '\n')
      })
      it('should prepend', () => {
        config.injectType = 'prepend'
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeStringInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(config.input + '\n<!-- inject:body-start -->')
      })
      it('should replace', () => {
        config.injectType = 'replace'
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeStringInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(config.input + '\n')
      })
    })
  })
})
