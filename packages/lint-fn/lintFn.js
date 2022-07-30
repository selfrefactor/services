const { commandFactory } = require('./_modules/commandFactory')
const { debugFlag, DIR } = require('./_modules/spawnCommand')
const { execPrettier } = require('./_modules/execPrettier')
const { executeCommand } = require('./_modules/exec')
const { tryCatchAsync } = require('rambdax')
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

    await usePrettier({
      filePath,
      cwdOverride,
      withTypescript : false,
      prettierSpecialCase,
      debug,
    })

    const { lintDefault, lintJest } = commandFactory({
      eslintPath,
      src : filePath,
    })

    if (filePath.endsWith('.spec.js') || filePath.endsWith('.spec.jsx')){
      const command = `${ lintJest.command } ${ lintJest.inputs.join(' ') }`
      if (debug){
        console.log('lintJest.command', command)
      }
      await executeCommand({
        cwd     : DIR,
        command : lintJest.command,
        inputs  : lintJest.inputs,
        debug,
      })

      return true
    }

    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')){
      const command = `${ lintDefault.command } ${ lintDefault.inputs.join(' ') }`
      if (debug) console.log(command)

      await executeCommand({
        cwd     : DIR,
        command : lintDefault.command,
        inputs  : lintDefault.inputs,
        debug,
      })

      return true
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
  debug = false,
}){
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
