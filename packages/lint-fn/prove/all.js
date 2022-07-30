process.env.NODE_ENV = 'DEBUG'
process.env.LINT_FN_DEBUG = 'ON'
const { lintFn, execPrettier } = require('../lintFn')
const { ANGULAR, TS_PROVE, JS, TS, JEST, ANGULAR_HTML } = require('../constants')

const debug = false
const injectOptions = '--print-width 34'

void (async function prove(){
  const angular = await lintFn({filePath: ANGULAR, debug})
  const defaultResult = await lintFn({filePath: JS, debug})
  const errorResult = await lintFn({
    filePath            : TS_PROVE,
    prettierSpecialCase : 'local',
    // error with outer
    // prettierSpecialCase : 'outer',
    debug
  })
  const execPrettierResult = await execPrettier({
    filePath:JS,
    injectOptions,
  })
  const forceTS = await lintFn({
    filePath: TS,
    prettierSpecialCase: 'local',
    forceTypescript: true,
    debug
  })
  const html = await execPrettier({
    filePath:ANGULAR_HTML,
    injectOptions,
    prettierSpecialCase:'html'
  })
  const jest = await lintFn({filePath: JEST})
  const typescriptProve = await lintFn({filePath: TS_PROVE, debug})

  console.log({
    execPrettierResult,
    jest,
    forceTS,
    html,
    errorResult,
    defaultResult,
    angular,
    typescriptProve
  })
})()
