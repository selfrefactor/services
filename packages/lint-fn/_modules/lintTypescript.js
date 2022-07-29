const { glue } = require('rambdax')
// const { spawnCommand } = require('./spawnCommand')
const { execCommand } = require('./exec')
const { usePrettier } = require('./usePrettier')

async function lintTypescript({ filePath, projectDir, prettierSpecialCase, cwdOverride = false, debug = false }){
  await usePrettier({
    filePath,
    withTypescript : true,
    prettierSpecialCase,
    cwdOverride,
  })

  const eslintCommand = glue(`
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `)
  // .split(' ')

  if (debug){
    console.log({
      label : 'lint typescript',
      eslintCommand,
      projectDir,
    })
  }
  return execCommand({cwd: projectDir, command: `node ${eslintCommand}`})
  // await spawnCommand(
  //   'node', eslintCommand, projectDir
  // )
}

exports.lintTypescript = lintTypescript
