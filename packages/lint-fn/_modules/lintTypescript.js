const { glue } = require('rambdax')
const { execCommand } = require('./exec')
const { usePrettier } = require('./usePrettier')

async function lintTypescript({ filePath, projectDir, prettierSpecialCase, cwdOverride = false, debug = false}){
  const usePrettierResult = await usePrettier({
    filePath,
    withTypescript : true,
    prettierSpecialCase,
    cwdOverride,
  })
  const command = glue(`
  node
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `)

  if (debug){
    console.log({
      label : 'lint typescript',
      command,
      projectDir,
    })
  }

  const lintTypescriptResult = await execCommand({
    cwd     : projectDir,
    command,
  })

  return {usePrettierResult, lintResult: lintTypescriptResult, case: 'ts'}
}

exports.lintTypescript = lintTypescript
