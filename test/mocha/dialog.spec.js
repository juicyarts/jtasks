import chai from 'chai'
let expect = chai.expect

import * as dialog from '../../lib/make/dialog'

describe('The Tegister Tasks function', () => {
  it('should unflatten the given object', () => {
    let tasks = {
      'log': true,
      'log.levels': ['error', 'debug'],
      'test': true,
      'test.unit': true,
      'test.unit.types': ['dev', 'build'],
      'test.unit.dev.files': ['static/js/src/**/*.js', 'static/js/lib/**/*.js']
    }
    let result = {
      log: {
        levels: ['error', 'debug']
      },
      test: {
        unit: {
          types: ['dev', 'build'],
          dev: {
            files: ['static/js/src/**/*.js', 'static/js/lib/**/*.js']
          }
        }
      }
    }
    expect(dialog.registerTasks(tasks)).eql(result)
  })
})
