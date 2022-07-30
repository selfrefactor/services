const { executeCommand } = require('./exec')
const { usePrettier } = require('./usePrettier')

async function lintTypescript({ filePath, projectDir, prettierSpecialCase, cwdOverride = false, debug = false }){
  const prettierResult = await usePrettier({
    filePath,
    withTypescript : true,
    prettierSpecialCase,
    cwdOverride,
    debug,
  })
  const inputs = [
    'node_modules/eslint/bin/eslint.js',
    `--fix`,
    filePath,
  ]
  if (debug){
    console.log({
      label   : 'lint typescript',
      command : inputs,
      projectDir,
      label: 'lintTypescript'
    })
  }
  const lintResult = await  executeCommand({
    cwd     : projectDir,
    command : 'node',
    inputs,
    debug
  })

  return {lintResult, prettierResult}
}

exports.lintTypescript = lintTypescript
