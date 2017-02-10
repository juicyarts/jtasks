import path from 'path'
import childProcess from 'child_process'

function getProtractorBinary (binaryName) {
  var winExt = /^win/.test(process.platform) ? '.cmd' : ''
  var pkgPath = require.resolve('protractor')
  var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'))
  return path.join(protractorDir, '/' + binaryName + winExt)
}

export function run (done) {
  childProcess.spawn(getProtractorBinary('protractor'), [path.join(__dirname, '../../configs/protractor.conf.js')], {
    stdio: 'inherit'
  }).on('error', function (err) {
    done(err)
  }).once('close', function (err) {
    if (err >= 1) {
      done(err)
    } else {
      console.log('protractor run - no errors')
      done()
    }
  })
}

export function install (done) {
  childProcess.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
    stdio: 'inherit'
  }).once('close', function (err) {
    if (err >= 1) {
      done(err)
    } else {
      console.log('protractor install - no errors')
      done()
    }
  })
}
