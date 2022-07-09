const { spawnCommand } = require('./spawnCommand')
const { glue, defaultTo } = require('rambdax')
const { resolve } = require('path')
const { getPrettierPath } = require('./usePrettier')

function getCommand({prettierSpecialCase, prettierPath, injectOptions, filePath}){
  if(prettierSpecialCase === 'html'){
    const htmlConfig = resolve(__dirname, '../config/.prettierrc')
    console.log(htmlConfig, `htmlConfig`)
    return glue(`
      ${ prettierPath }
      --config
      ${ htmlConfig }
      ${ injectOptions }
      --write
      ${ filePath }
    `).split(' ')
  }
  return glue(`
  ${ prettierPath }
  ${ injectOptions }
  --write
  ${ filePath }
`).split(' ')
}

async function execPrettier({ filePath, injectOptions, prettierSpecialCase }){
  const cwd = resolve(__dirname, '../')
  const prettierPath = getPrettierPath(cwd, defaultTo('skip', prettierSpecialCase))
  
  const command = getCommand({filePath, prettierPath,prettierSpecialCase, injectOptions})
  console.log(command.join(` `), `command`)
  await spawnCommand('node', command, cwd)
}

exports.execPrettier = execPrettier
