const { executeCommand } = require('./exec')
const { defaultTo } = require('rambdax')
const { resolve } = require('path')
const { getPrettierPath } = require('./usePrettier')

function getCommand({prettierSpecialCase, prettierPath, injectOptions, filePath}){
  if(prettierSpecialCase === 'html'){
    const htmlConfig = resolve(__dirname, '../config/.prettierrc')
    return [
      prettierPath
      `--config`,
      htmlConfig,
      injectOptions,
      `--write`,
      filePath
    ]
  }
  return [
    prettierPath,
    injectOptions,
    `--write`,
    filePath
  ]
}

async function execPrettier({ filePath, injectOptions, prettierSpecialCase, debug }){
  const cwd = resolve(__dirname, '../')
  const prettierPath = getPrettierPath(cwd, defaultTo('skip', prettierSpecialCase))
  
  const command = getCommand({filePath, prettierPath,prettierSpecialCase, injectOptions})
  await executeCommand({command: 'node', inputs: command, cwd, debug})
}

exports.execPrettier = execPrettier
