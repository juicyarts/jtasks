import jsdoc from 'gulp-jsdoc3'

/**
 * @module doc
 */

/**
 * @description
 * unfortunately jsdoc goes a little crazy on single module exports
 * so just look at the example please and ignore the require line above this
 * @example
// how to import it
var doc = require('route/from/your/location/tasks/common/doc')
// or
import doc from 'route/from/your/location/tasks/common/doc'
var config = {
 files: ['README.md', './lib/** /*.js'],
 options: {
  opts: {
   destination: './docs/documentation/jsdoc'
  }
}
gulp.task('doc', () => {
  return doc(gulp, config)
})
// creates a html documentation of your inline jsdoc comments
// you can also add Markdown files
 * @export
 * @param {any} gulp
 * @param {Object} config
 */
export default function (gulp, config, done) {
  let options = Object.assign({
    tags: {
      allowUnknownTags: true
    },
    source: {
      excludePattern: '(^|\\/|\\\\)_'
    },
    plugins: [
      'plugins/markdown'
    ],
    templates: {
      cleverLinks: true,
      monospaceLinks: false,
      outputSourceFiles: true,
      recurse: true,
      path: 'ink-docstrap',
      theme: 'paper',
      navType: 'vertical',
      linenums: false,
      syntaxTheme: 'dark',
      dateFormat: 'MMMM Do YYYY, h:mm:ss a'
    }
  }, config.options)

  gulp.src(config.files, { read: false })
    .pipe(jsdoc(options, done))
}
