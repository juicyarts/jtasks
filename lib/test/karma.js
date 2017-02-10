import path from 'path'
import karma from 'karma'

let Server = karma.Server

export default function (config, action, cwd, done) {
  let options = Object.assign({
    basePath: cwd,
    configFile: path.join(__dirname, '../../configs/karma.conf.js'),
    coverageReporter: {
      reporters: [
        {
          type: 'html'
        }, {
          type: 'text-summary'
        }, {
          type: 'cobertura'
        }
      ]
    },
    reporters: ['progress', 'coverage', 'junit'],
    junitReporter: {
      useBrowserName: true
    },
    singleRun: action === 'run'
  }, config)
  new Server(options, done).start()
}
