process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { REACT } = require('../constants')

void (async function prove(){
  console.time('prove')
  await lintFn({filePath: REACT, debug:true})
  console.timeEnd('prove')
})()
