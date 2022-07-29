process.env.LINT_FN_DEBUG = 'ON'
// process.env.SKIP_ESLINT_RULES = 'no-nested-ternary,max-len'
const { lintFn } = require('../lintFn')
const { JS } = require('../constants')

void (async function prove(){
  console.time('prove')
  await lintFn(JS)
  console.timeEnd('prove')
})()
