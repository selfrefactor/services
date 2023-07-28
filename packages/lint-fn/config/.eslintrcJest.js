const {baseRules, baseConfiguration} = require('./.eslintBase')
const {filter} = require('./filter')

const rules = {
  ...baseRules,
  'jest-formatting/padding-around-test-blocks': 1,
  'jest/consistent-test-it': 1,
  'jest/no-alias-methods': 1,
  'jest/no-identical-title': 1,
  'jest/no-large-snapshots': [1, {maxSize: 400}],
  'jest/prefer-comparison-matcher': 1,
  'jest/prefer-expect-resolves': 1,
  'jest/prefer-lowercase-title': 1,
  'jest/prefer-spy-on': 1,
  'jest/prefer-strict-equal': 0,
  'jest/prefer-to-be': 1,
  'jest/prefer-to-contain': 1,
  'jest/prefer-to-have-length': 1,
  'jest/require-tothrow-message': 0,
  'jest/valid-title': 1,
}

module.exports = {
  ...baseConfiguration,
  plugins: [
    'async-await',
    'jest-formatting',
    'simple-import-sort',
    'node',
    'jest',
  ],
  extends: [
    'plugin:perfectionist/recommended-alphabetical',
    'plugin:perfectionist/recommended-natural',
    'plugin:perfectionist/recommended-line-length',
  ],
  env: {
    es6: true,
    jasmine: true,
    jest: true,
  },
  rules: filter(rules),
}
