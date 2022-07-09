process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { ANGULAR } = require('../constants')

void (async function prove(){
  console.time('prove')
  await lintFn(ANGULAR)
  console.timeEnd('prove')
})()
