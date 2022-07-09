process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { TS_PROVE } = require('../constants')

void (async function prove(){
  console.time('prove')
  await lintFn(TS_PROVE)
  console.timeEnd('prove')
})()
