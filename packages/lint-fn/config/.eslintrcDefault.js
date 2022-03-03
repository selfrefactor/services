const baseRules = require('./.eslintBase')
const {filter} = require('./filter')

const fileExtensionRule =
  process.env.ENABLE_FILE_EXTENSION_RULE === 'ON'
    ? {
        'node/file-extension-in-import': [
          1,
          'always',
          {
            tryExtensions: ['.js'],
          },
        ],
      }
    : {'node/file-extension-in-import': [1, 'never']}

const rules = {
  ...baseRules,
  ...fileExtensionRule,
  'no-unsafe-regex/no-unsafe-regex': 2,
  'sort-requires/sort-requires': 1,
  'async-await/space-after-async': 1,
  'async-await/space-after-await': 1,
}

module.exports = {
  extends: 'eslint:recommended',
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {es6: true},
  plugins: [
    'async-await',
    'no-unsafe-regex',
    'simple-import-sort',
    'node',
    'sort-requires',
  ],
  rules: filter(rules),
}
