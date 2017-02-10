'use strict'

var applicationConf = {
  tasks: {
    test: {
      mocha: {
        test: [
          './test/mocha/**/*.js'
        ],
        src: [
          './lib/common/**/*.js'
        ]
      },
      e2e:{
        protractor: {
          files: 'test/e2e/pro/**/*.js'
        },
        galen: {
          files: 'test/e2e/galen/suites/**/*'
        }
      }
    },
    log: {
      levels: ['warn', 'error', 'info'],
      selectors: ['admon']
    },
    clean: {
      files: [
        'temp/trashtest/**.*'
      ]
    },
    fallbackLib: {
      root: 'static/gfx/fallback',
      removePath: true,
      removePatternFromFileName: /(\-\d)?(.gif|.jpg|.png)/,
      getFileByRegEx: true,
      files: [/(\d){1,4}(x)(\d){1,4}(\-\d)?(\.).*/],
      outputPath: 'tmpl/ov/json',
      outputName: 'fbSizes.tmpl'
    },
    doc: {
      files: ['README.md', './lib/**/*.js'],
      options: {
        templates: {
          systemName: 'ComonTasks',
          includeDate: true,
          navType: 'inline',
          collapseSymbols: true,
          inverseNav: true,
          theme: 'lumen',
          syntaxTheme: 'dark',
          footer: '<div class="container"><div class="row"><div class="col-md-12">Bei Fragen huess fragen</div></div></div>'
        },
        opts: {
          destination: './docs/documentation/jsdoc',
          tutorials: './docs/documentation/tutorials'
        }
      }
    },
    js: {
      lint: {
        files: [
          'lib/**/*.js',
          'test/**/*.js'
        ]
      },
      uglify: {
        outputName: 'default.min.js',
        outputPath: 'dist',
        options: {
          mangle: false,
          removeLogs: true
        },
        files: [
          'temp/test.js'
        ]
      }
    }
  }
}

module.exports = applicationConf
