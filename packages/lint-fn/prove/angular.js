process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { ANGULAR } = require('../constants')

void (async function prove(){
  const result = await lintFn({filePath: ANGULAR, debug: true})
  console.log(result, `result`)
})()
