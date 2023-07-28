const {baseRules, baseConfiguration} = require('./.eslintBase')
const {filter} = require('./filter')

const sortProps = {
  callbacksLast: true,
  shorthandFirst: true,
}

const sortMembers = {
  order: [
    '[static-properties]',
    '[static-methods]',
    '[properties]',
    '[conventional-private-properties]',
    'constructor',
    '[methods]',
    '[conventional-private-methods]',
  ],
  accessorPairPositioning: 'getThenSet',
}

const reactRules = {
  'react/jsx-curly-spacing'            : [ 1, 'always' ],
  'react/jsx-indent'                   : [ 1, 2, {checkAttributes: true, indentLogicalExpressions: true} ],
  'no-unused-vars': 0,
  'key-spacing': 0,
  'no-extra-parens': 0,
  'jsx-quotes': [1, 'prefer-single'],
  'react/destructuring-assignment': 0,
  'react/jsx-boolean-value': [1, 'always'],
  'react/jsx-child-element-spacing': 1,
  'react/jsx-closing-bracket-location': 1,
  'react/jsx-closing-tag-location': 0,
  'react/jsx-equals-spacing': [1, 'never'],
  'react/jsx-first-prop-new-line': [1, 'multiline'],
  'react/jsx-fragments': 0,
  'react/jsx-indent-props': [1, 2],
  'react/jsx-max-depth': [1, {max: 4}],
  'react/jsx-max-props-per-line': [1, {maximum: 2}],
  'react/jsx-no-literals': 0,
  'react/jsx-no-target-blank': 1,
  'react/jsx-no-undef': 1,
  'react/jsx-pascal-case': 1,
  'react/jsx-sort-props': [1, sortProps],
  'react/jsx-tag-spacing': 1,
  'react/jsx-wrap-multilines': 1,
  'react/no-children-prop': 1,
  'react/no-danger': 1,
  'react/no-danger-with-children': 1,
  'react/no-did-mount-set-state': 1,
  'react/no-did-update-set-state': 1,
  'react/no-multi-comp': 0,
  'react/no-set-state': 0,
  'react/no-unescaped-entities': 1,
  'react/no-unknown-property': 1,
  'react/no-unused-prop-types': 1,
  'react/prefer-es6-class': 1,
  'react/prop-types': 0,
  'react/react-in-jsx-scope': 1,
  'react/require-default-props': 0,
  'react/self-closing-comp': 1,
  'react/sort-comp': 1,
  'react/sort-prop-types': 1,
  'sort-class-members/sort-class-members': [1, sortMembers],
  'react-hooks/rules-of-hooks': 1,
  'react-hooks/exhaustive-deps': 1,
}

const rules = {
  ...baseRules,
  ...reactRules,
}

module.exports = {
  ...baseConfiguration,
  plugins: [
    'async-await', 
    'react',
    'react-hooks',
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
    jest: false,
    browser: true,
    react: true
  },
  rules: filter(rules),
}
