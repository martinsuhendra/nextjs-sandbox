const fs = require('fs')
const chalk = require('chalk')
const { i18n } = require('./next-i18next.config')

const DEFAULT_NAMESPACE = 'common'

module.exports = {
  input: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  output: './',
  options: {
    sort: true,
    removeUnusedKeys: true,
    lngs: i18n.locales.filter((locale) => locale !== i18n.defaultLocale),
    ns: [DEFAULT_NAMESPACE],
    defaultLng: i18n.locales[0],
    defaultNs: DEFAULT_NAMESPACE,
    defaultKey: (_lng, ns, key) => `${ns}-${key}`,
    defaultValue: (_lng, _ns, key) => key,
    resource: {
      loadPath: 'public/locales/__lng__/__ns__.json',
      savePath: 'public/locales/__lng__/__ns__.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    interpolation: {
      prefix: '__',
      suffix: '__',
    },
  },
  transform: function customTransform(file, enc, done) {
    'use strict'
    const parser = this.parser
    const content = fs.readFileSync(file.path, enc)

    let ns
    const match = content.match(/useTranslation\(.+\)/)
    if (match) ns = match[0].split(/(\'|\")/)[2]

    let count = 0
    parser.parseFuncFromString(
      content,
      { list: ['t'] },
      function (key, options) {
        parser.set(
          key,
          Object.assign({}, options, {
            ns: ns ? ns : DEFAULT_NAMESPACE,
            nsSeparator: false,
            keySeparator: false,
          })
        )
        ++count
      }
    )
    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      )
    }

    done()
  },
}
