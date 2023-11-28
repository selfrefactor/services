process.env.NODE_ENV = 'DEBUG'
const { execPrettier } = require('../lintFn')
const { JS } = require('../constants')

const injectOptions = '--print-width 34'

void (async function prove(){
  
  // is it expected the log `You should use 'prettierSpecialCase = local'`
  await execPrettier({
    filePath:JS,
    injectOptions,
  })
  
})()
