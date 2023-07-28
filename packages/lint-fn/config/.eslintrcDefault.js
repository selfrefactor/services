const {baseRules, baseConfiguration} = require('./.eslintBase')
const {filter} = require('./filter')

const rules = {
  ...baseRules,
  'no-unsafe-regex/no-unsafe-regex': 2,
  'sort-requires/sort-requires': 1,
  'async-await/space-after-async': 1,
  'async-await/space-after-await': 1,
}

module.exports = {
  ...baseConfiguration,
  extends: [
    'eslint:recommended',
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:perfectionist/recommended-natural',
    'plugin:perfectionist/recommended-line-length',
  ],
  env: {es6: true},
  plugins: [
    'async-await',
    'no-unsafe-regex',
    'simple-import-sort',
    'node',
    'sort-requires',
    "perfectionist"
  ],
  rules: filter(rules),
}
