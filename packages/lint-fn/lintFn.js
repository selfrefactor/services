const { commandFactory } = require('./_modules/commandFactory')
const { debugFlag, DIR } = require('./_modules/constants')
const { execPrettier } = require('./_modules/execPrettier')
const { executeCommand } = require('./_modules/exec')
const { tryCatchAsync, setter, getter } = require('rambdax')
const { getEslintPath } = require('./_modules/getEslintPath')
const { handleTypescript } = require('./_modules/handleTypescript')
const { usePrettier } = require('./_modules/usePrettier')

process
  .on('unhandledRejection', (reason, p) => {
    console.error(
      reason, 'Unhandled Rejection at Promise', p
    )
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  })

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

async function lintFunction({
  filePath,
  prettierSpecialCase,
  cwdOverride,
  forceTypescript,
  debug,
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

    const prettierResult = await usePrettier({
      filePath,
      cwdOverride,
      withTypescript : false,
      prettierSpecialCase,
      debug,
    })

    const { lintDefault, lintJest, lintReact } = commandFactory({
      eslintPath,
      src : filePath,
    })

    if (filePath.endsWith('.spec.js') || filePath.endsWith('.spec.jsx')){
      const command = `${ lintJest.command } ${ lintJest.inputs.join(' ') }`
      if (debug){
        console.log('lintJest.command', command)
      }
      const lintResult = await executeCommand({
        cwd     : DIR,
        command : lintJest.command,
        inputs  : lintJest.inputs,
        debug,
      })

      return {lintResult, prettierResult}
    }

    if (filePath.endsWith('.jsx')){
      const command = `${ lintReact.command } ${ lintReact.inputs.join(' ') }`
      if (debug) console.log(command)

      const lintResult = await executeCommand({
        cwd     : DIR,
        command : lintReact.command,
        inputs  : lintReact.inputs,
        debug,
      })

      return {lintResult, prettierResult}
    }
    if (filePath.endsWith('.js')){
      const command = `${ lintDefault.command } ${ lintDefault.inputs.join(' ') }`
      if (debug) console.log(command)

      const lintResult = await executeCommand({
        cwd     : DIR,
        command : lintDefault.command,
        inputs  : lintDefault.inputs,
        debug,
      })

      return {lintResult, prettierResult}

    }

    return console.log(NO_AVAILABLE_LINTER)
  } catch (err){
    console.log(err, 'in lint.fn')

    return false
  }
}

async function lintFn({
  filePath,
  prettierSpecialCase = 'local',
  cwdOverride = false,
  forceTypescript = false,
  useAlternativeExecCommand = false,
  debug = false,
}){
  setter('ALTERNATIVE_EXEC', useAlternativeExecCommand)
  const result = await tryCatchAsync(async (input) => lintFunction(input), false)({
    filePath,
    prettierSpecialCase,
    cwdOverride,
    forceTypescript,
    debug,
  })

  return result
}

exports.lintFn = lintFn
exports.execPrettier = execPrettier
