process.env.NODE_ENV = 'DEBUG'
const { execPrettier } = require('../lintFn')
const { ANGULAR_HTML } = require('../constants')

const injectOptions = '--print-width 34'

void (async function prove(){
  
  await execPrettier({
    filePath:ANGULAR_HTML,
    injectOptions,
    prettierSpecialCase:'html'
  })
  
})()
