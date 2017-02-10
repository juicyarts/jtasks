import chai from 'chai'
import mockFs from 'mock-fs'
import fs from 'fs'
import path from 'path'

import * as fInject from '../../lib/common/fInject'

let expect = chai.expect
let config, input, output

describe('Inject String', () => {
  afterEach(() => {
    mockFs.restore()
  })

  describe('writeArrayInFile', () => {
    describe('input Array | js', () => {
      beforeEach(() => {
        mockFs({
          'foo/bar': {
            'in.html': '<!-- inject:js-start -->'
          }
        })
        input = [
          'bar/baz/foobar.js',
          'bar/baz/qux.js',
          'bar/baz/quux.js'
        ]
        output = `<!-- inject:js-start -->
<script type="text/javascript" src="bar/baz/foobar.js"></script>
<script type="text/javascript" src="bar/baz/qux.js"></script>
<script type="text/javascript" src="bar/baz/quux.js"></script>
`

        config = {
          inputType: 'array',
          inputFile: 'foo/bar/in.html',
          inputSelector: '<!-- inject:js-start -->',
          input: input,
          injectType: 'append',
          outputPath: 'foo/bar',
          outputName: 'out.html',
          newLine: true
        }
      })
      it('should append', () => {
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeArrayInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(output)
      })

      it('should prepend', () => {
        output = `<script type="text/javascript" src="bar/baz/foobar.js"></script>
<script type="text/javascript" src="bar/baz/qux.js"></script>
<script type="text/javascript" src="bar/baz/quux.js"></script>
<!-- inject:js-start -->`
        config.injectType = 'prepend'
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeArrayInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(output)
      })

      it('should replace', () => {
        output = `<script type="text/javascript" src="bar/baz/foobar.js"></script>
<script type="text/javascript" src="bar/baz/qux.js"></script>
<script type="text/javascript" src="bar/baz/quux.js"></script>
`
        config.injectType = 'replace'
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeArrayInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(output)
      })
    })

    describe('input Array | css', () => {
      beforeEach(() => {
        mockFs({
          'foo/bar': {
            'in.html': '<!-- inject:css-start -->'
          }
        })
        input = [
          'bar/baz/foobar.css',
          'bar/baz/qux.css',
          'bar/baz/quux.css'
        ]
        output = `<!-- inject:css-start -->
<link type="text/css" rel="stylesheet" href="bar/baz/foobar.css"></link>
<link type="text/css" rel="stylesheet" href="bar/baz/qux.css"></link>
<link type="text/css" rel="stylesheet" href="bar/baz/quux.css"></link>
`
        config = {
          inputType: 'array',
          inputFile: 'foo/bar/in.html',
          inputSelector: '<!-- inject:css-start -->',
          input: input,
          injectType: 'replace',
          outputPath: 'foo/bar',
          outputName: 'out.html',
          newLine: true
        }
      })
      it('should replace', () => {
        output = `<link type="text/css" rel="stylesheet" href="bar/baz/foobar.css"></link>
<link type="text/css" rel="stylesheet" href="bar/baz/qux.css"></link>
<link type="text/css" rel="stylesheet" href="bar/baz/quux.css"></link>
`
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeArrayInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(output)
      })
    })

    describe('input Array | mixed', () => {
      beforeEach(() => {
        mockFs({
          'foo/bar': {
            'in.html': '<!-- inject:mixed-start -->'
          }
        })
        input = [
          'bar/baz/foobar.css',
          'bar/baz/qux.css',
          'bar/baz/quux.css',
          'bar/baz/foobar.js',
          'bar/baz/qux.js',
          'bar/baz/quux.js'
        ]
        output = `<link type="text/css" rel="stylesheet" href="bar/baz/foobar.css"></link>
<link type="text/css" rel="stylesheet" href="bar/baz/qux.css"></link>
<link type="text/css" rel="stylesheet" href="bar/baz/quux.css"></link>
<script type="text/javascript" src="bar/baz/foobar.js"></script>
<script type="text/javascript" src="bar/baz/qux.js"></script>
<script type="text/javascript" src="bar/baz/quux.js"></script>
`
        config = {
          inputType: 'array',
          inputFile: 'foo/bar/in.html',
          inputSelector: '<!-- inject:mixed-start -->',
          input: input,
          injectType: 'replace',
          outputPath: 'foo/bar',
          outputName: 'out.html',
          newLine: true
        }
      })
      it('should replace', () => {
        var body = fs.readFileSync(config.inputFile).toString()
        fInject.writeArrayInFile(config, body)
        expect(fs.existsSync(config.inputFile)).to.be.true
        expect(fs.existsSync(path.join(config.outputPath, config.outputName))).to.be.true
        var contents = fs.readFileSync(path.join(process.cwd(), config.outputPath, config.outputName), 'utf-8')
        expect(contents).to.equal(output)
      })
    })
  })
})
