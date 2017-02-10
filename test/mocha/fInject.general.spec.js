import chai from 'chai'
import sinon from 'sinon'
import mockFs from 'mock-fs'

import * as logger from '../../lib/common/logger'
import * as fInject from '../../lib/common/fInject'

let expect = chai.expect
let config

describe('Inject General', () => {
  beforeEach(() => {
    logger.configure({
      selectors: ['mocha', 'test'],
      levels: ['success', 'warn', 'info', 'debug', 'error', 'log']
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  describe('checkForErrors', () => {
    describe('input file doesnt exist', () => {
      beforeEach(() => {
        sinon.spy(logger, 'error')
        config = {
          inputType: 'string',
          inputFile: 'foo/bar/baz.tmpl',
          inputSelector: '<!-- inject:body-start -->',
          input: '<body>',
          injectType: 'append',
          outputPath: 'foo/bar',
          outputName: 'out.tmpl'
        }
      })
      it('should return logger error', () => {
        fInject.checkForErrors(config)
        expect(logger.error.called).to.be.true
      })
      afterEach(() => {
        logger.error.restore()
      })
    })
    describe('output path doesnt exist', () => {
      beforeEach(() => {
        sinon.spy(logger, 'error')
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
          outputPath: 'foo/baz',
          outputName: 'out.tmpl'
        }
      })
      it('should return logger error', () => {
        fInject.checkForErrors(config)
        expect(logger.error.called).to.be.true
      })
      afterEach(() => {
        logger.error.restore()
      })
    })

    describe('types dont match', () => {
      beforeEach(() => {
        logger.configure({
          levels: ['debug', 'error']
        })
        sinon.spy(logger, 'error')
        sinon.spy(logger, 'debug')
        mockFs({
          'foo/bar': {
            'in.tmpl': '<!-- inject:body-start -->'
          }
        })
        config = {
          inputType: 'string',
          inputFile: 'foo/bar/in.tmpl',
          inputSelector: '<!-- inject:body-start -->',
          input: 1,
          injectType: 'append',
          outputPath: 'foo/bar',
          outputName: 'out.tmpl'
        }
      })
      it('should return logger error and debug', () => {
        fInject.checkForErrors(config)
        expect(logger.error.called).to.be.true
        expect(logger.debug.called).to.be.true
        expect(logger.debug.calledWith('missmatch', {
          expectedType: config.inputType,
          foundType: typeof config.input
        })).to.be.true
      })
      afterEach(() => {
        logger.error.restore()
        logger.debug.restore()
      })
    })
  })

  describe('write', () => {
    describe('empty file', () => {
      beforeEach(() => {
        logger.configure({
          levels: ['debug', 'error']
        })
        sinon.spy(logger, 'error')
        mockFs({
          'foo/bar': {
            'in.tmpl': ''
          }
        })
        config = {
          inputType: 'string',
          inputFile: 'foo/bar/in.tmpl',
          inputSelector: '<!-- inject:body-start -->',
          input: '<body>',
          injectType: 'append',
          outputPath: 'foo/bar',
          outputName: 'out.tmpl'
        }
      })
      it('should log error', () => {
        fInject.write(config)
        expect(logger.error.called).to.be.true
        expect(logger.error.calledWith('Selector: ' + config.inputSelector + ' not found in file')).to.be.true
      })
      afterEach(() => {
        logger.error.restore()
      })
    })

    describe('inputSelector not found', () => {
      beforeEach(() => {
        logger.configure({
          levels: ['debug', 'error']
        })
        sinon.spy(logger, 'error')
        mockFs({
          'foo/bar': {
            'in.tmpl': '<!-- inject:body-end -->'
          }
        })
        config = {
          inputType: 'string',
          inputFile: 'foo/bar/in.tmpl',
          inputSelector: '<!-- inject:body-start -->',
          input: '<body>',
          injectType: 'append',
          outputPath: 'foo/bar',
          outputName: 'out.tmpl'
        }
      })

      it('should log error', () => {
        fInject.write(config)
        expect(logger.error.called).to.be.true
        expect(logger.error.calledWith('Selector: ' + config.inputSelector + ' not found in file')).to.be.true
      })
      afterEach(() => {
        logger.error.restore()
      })
    })
  })
})
