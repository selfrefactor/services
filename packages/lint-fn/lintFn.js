const { commandFactory } = require('./_modules/commandFactory')
const { debugFlag, DIR } = require('./_modules/spawnCommand')
const { execCommand } = require('./_modules/exec')
const { execPrettier } = require('./_modules/execPrettier')
const { getEslintPath } = require('./_modules/getEslintPath')
const { handleTypescript } = require('./_modules/handleTypescript')
const { usePrettier } = require('./_modules/usePrettier')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

async function lintFn({
  filePath,
  prettierSpecialCase = 'local',
  cwdOverride = false,
  forceTypescript = false,
  debug = false,
}){
  try {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')){
      return handleTypescript({
        filePath,
        prettierSpecialCase,
        cwdOverride,
        forceTypescript,
        debug,
      })
    }

    const eslintPath = getEslintPath(debugFlag)

    if (!eslintPath) return console.log('No ESLint path found')

    const usePrettierResult = await usePrettier({
      filePath,
      cwdOverride,
      withTypescript : false,
      prettierSpecialCase,
    })

    const { lintDefault, lintJest } = commandFactory({
      eslintPath,
      src : filePath,
    })

    if (filePath.endsWith('.spec.js')){
      const command = `${ lintJest.command } ${ lintJest.inputs.join(' ') }`
      if (debug){
        console.log('lintJest.command', command)
      }
      const lintJestResult = await execCommand({
        cwd : DIR,
        command,
      })

      return {usePrettierResult, lintResult: lintJestResult, case: 'jest'}
    }

    if (filePath.endsWith('.js')){
      const command = `${ lintDefault.command } ${ lintDefault.inputs.join(' ') }`
      if (debug) console.log(command)
      const lintJsResult = await execCommand({
        cwd : DIR,
        command,
      })

      return {usePrettierResult, lintResult: lintJsResult, case: 'js'}
    }

    return console.log(NO_AVAILABLE_LINTER)
  } catch (err){
    console.log(err, 'in lint.fn')

    return false
  }
}

exports.lintFn = lintFn
exports.execPrettier = execPrettier
