process.env.LINT_FN_DEBUG = 'ON'
const { lintFn } = require('../lintFn')
const { JEST } = require('../constants')

void (async function prove(){
  
  await lintFn({filePath: JEST})
  
})()
