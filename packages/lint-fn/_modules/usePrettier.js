const { executeCommand } = require('./exec')
const { existsSync } = require('fs')
const { glue } = require('rambdax')
const { resolve } = require('path')

const PRETTIER_PATH_BASE = 'node_modules/prettier/bin-prettier.js'

const getPrettierPath = (cwd, prettierSpecialCase) => {
  if (prettierSpecialCase.includes('local')) return `${ cwd }/${ PRETTIER_PATH_BASE }`

  const otherPossiblePath = resolve(__dirname,
    `../../../${ PRETTIER_PATH_BASE }`)
  if (prettierSpecialCase.includes('outer')) return otherPossiblePath

  if (existsSync(`${ cwd }/${ PRETTIER_PATH_BASE }`)){
    console.log('You should use \'prettierSpecialCase = local\'')

    return `${ cwd }/${ PRETTIER_PATH_BASE }`
  }

  if (existsSync(otherPossiblePath)){
    console.log('You should use \'prettierSpecialCase = outer\'')

    return otherPossiblePath
  }

  throw new Error('Prettier was not found "lint.fn"')
}

async function usePrettier({
  filePath,
  withTypescript,
  prettierSpecialCase,
  cwdOverride,
  debug,
}){
  const cwdDefault = resolve(__dirname, '../')
  const cwd = cwdOverride ? cwdOverride : cwdDefault
  const prettierPath = getPrettierPath(cwdDefault, prettierSpecialCase)
  if (debug){
    console.log({
      prettierPath,
      cwd,
      filePath,
    })
  }

  /*
    Other option is `--parser babel-ts`
  */
  const typescriptPart = withTypescript ? '--parser typescript' : ''

  const inputs = glue(`
  ${ prettierPath }
  --no-semi
  --no-bracket-spacing
  --print-width 77
  --single-quote
  ${ debug ? '--loglevel debug --file-info' : '' }
  --no-bracket-spacing
  --trailing-comma es5
  --arrow-parens avoid
  --write
  ${ typescriptPart }
  ${ filePath }
`).split(' ')

  return executeCommand({
    command : 'node',
    inputs,
    cwd,
    debug,
  })
}

exports.usePrettier = usePrettier
exports.getPrettierPath = getPrettierPath
