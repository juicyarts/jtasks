'use strict'
var path = require('path')
var config = require(process.cwd() + '/application.conf.js')
var specs = path.join(process.cwd(), config.tasks.test.e2e.protractor.files)

exports.config = {
  seleniumAdress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://127.0.0.1:5000',
  specs: specs,
  desiredCapabilities: {
    browserName: 'chrome'
  },
  maxSessions: 1,
  framework: 'jasmine',
  onPrepare: function () {
    browser.ignoreSynchronisation = true

    var SpecReporter = require('jasmine-spec-reporter')
    var jasmineReporters = require('jasmine-reporters')

    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: false
    }))

    // add jasmine Junit export
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: path.join(process.cwd(), 'docs/junit'),
      filePrefix: 'e2eReport'
    }))
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
}
