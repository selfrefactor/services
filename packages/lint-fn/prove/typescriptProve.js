// process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { TS_PROVE } = require('../constants')

void (async function prove(){
  
await lintFn({filePath: TS_PROVE, debug:true})
  
})()
