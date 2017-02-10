var path = require('path')
var config = require(process.cwd() + '/application.conf.js')
var specs = config.tasks.test.e2e.nightwatch.files

var jar = require('selenium-server-standalone-jar');
var chromedriver = require('chromedriver');

module.exports = (function (settings) {
  console.log('TEST TEST')
  settings.selenium.server_path = jar.path
  settings.selenium.cli_args['webdriver.chrome.driver'] = chromedriver.path
  settings.src_folders = specs
  console.log('TEST TEST 2', settings)
  return settings
})(require('./nightwatch.json'))
