import validate from 'validate-yaml'
import fs from 'fs'
import path from 'path'

import chai from 'chai'
let expect = chai.expect
let source

describe('jenkinsfile.yml', () => {
  beforeEach(() => {
    source = fs.readFileSync(path.join(__dirname, '../../jenkinsfile.yml'), 'utf-8')
  })

  it('should be valid', () => {
    expect(validate(source)).to.be.true
  })
})
