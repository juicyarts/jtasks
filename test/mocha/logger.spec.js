import chai from 'chai'
import sinon from 'sinon'
import chalk from 'chalk'

let expect = chai.expect
let config

import * as logger from '../../lib/common/logger'

describe('logger', () => {
  beforeEach(() => {
    sinon.spy(console, 'log')
  })
  afterEach(function () {
    console.log.restore()
  })
  describe('logger.configure', () => {
    it('should set values to logger', () => {
      sinon.spy(logger, 'setSelector')
      config = {
        selectors: ['mocha', 'test'],
        levels: ['success', 'warn', 'info', 'debug', 'error', 'log']
      }
      logger.configure(config)
      expect(logger.config).to.be.defined
      expect(logger.setSelector.called).to.be.true
      expect(logger.setSelector.calledWith(config.selectors)).to.be.true
      logger.setSelector.restore()
    })
  })
  describe('setSelector', () => {
    it('should set the selectors that will be show in the log', () => {
      logger.setSelector(['foo', 'bar', 'baz'])
      expect(logger.selector).to.equal('foo | bar | baz | ')
    })
  })
  describe('logger.success', () => {
    it('should run console.log', () => {
      let key = 'key'
      let value = 'value'
      logger.success(key, value)
      sinon.assert.called(console.log)
      sinon.assert.calledWithMatch(console.log, chalk.bgGreen.dim.black(' logger | Success '))
    })
  })
  describe('logger.info', () => {
    it('should run console.log', () => {
      let key = 'key'
      let value = 'value'
      logger.info(key, value)
      sinon.assert.called(console.log)
      sinon.assert.calledWithMatch(console.log, chalk.bgBlue.dim.black(' logger | Info '))
    })
  })
  describe('logger.warn', () => {
    it('should run console.log', () => {
      let key = 'key'
      let value = 'value'
      logger.warn(key, value)
      sinon.assert.called(console.log)
      sinon.assert.calledWithMatch(console.log, chalk.bgYellow.dim.black(' logger | Warning '))
    })
  })
  describe('logger.error', () => {
    it('should run console.log', () => {
      let key = 'key'
      let value = 'value'
      logger.error(key, value)
      sinon.assert.called(console.log)
      sinon.assert.calledWithMatch(console.log, chalk.bgRed.dim.black(' logger | Error '))
    })
  })
  describe('logger.debug', () => {
    it('should run console.log', () => {
      let key = 'key'
      let value = 'value'
      logger.debug(key, value)
      sinon.assert.called(console.log)
      sinon.assert.calledWithMatch(console.log, chalk.bgCyan.dim.black(' logger | Debug '))
    })
  })
})
