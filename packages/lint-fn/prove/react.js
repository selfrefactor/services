process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { REACT } = require('../constants')

void (async function prove(){
  
  await lintFn({filePath: REACT, forceTypescript: true, debug:true})
  
})()
