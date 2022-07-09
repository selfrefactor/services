process.env.NODE_ENV = 'DEBUG'
const { execPrettier } = require('../lintFn')
const { JS, ANGULAR_HTML } = require('../constants')

const injectOptions = '--print-width 34'

void (async function prove(){
  console.time('prove')
  await execPrettier({
    filePath:ANGULAR_HTML,
    injectOptions,
    prettierSpecialCase:'html'
  })
  console.timeEnd('prove')
})()
