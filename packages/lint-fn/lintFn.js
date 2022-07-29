const { commandFactory } = require('./_modules/commandFactory')
const { execPrettier } = require('./_modules/execPrettier')
const { getEslintPath } = require('./_modules/getEslintPath')
const { spawn, debugFlag } = require('./_modules/spawnCommand')
const { usePrettier } = require('./_modules/usePrettier')
const { handleTypescript } = require("./_modules/handleTypescript")

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

async function lintFn(
  filePath,
  prettierSpecialCase = 'local',
  cwdOverride = false,
  forceTypescript = false,
  debug = false
){
  try {
    if (filePath.endsWith('.ts')){
      return handleTypescript(
        filePath,
        prettierSpecialCase,
        cwdOverride,
        forceTypescript,
        debug
      )
    }

    const eslintPath = getEslintPath(debugFlag)

    if (!eslintPath) return console.log('No ESLint path found')

    await usePrettier({
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
      if(debug){
        console.log(`lintJest.command, lintJest.inputs`, `${ lintJest.command } ${ lintJest.inputs.join(' ') }`)
      }

      return spawn(lintJest.command, lintJest.inputs)
    }

    if (filePath.endsWith('.js')){
      if(debug){
        console.log(`lintDefault.command, lintDefault.inputs`, `${ lintDefault.command } ${ lintDefault.inputs.join(' ') }`)
      }
      return spawn(lintDefault.command, lintDefault.inputs)
    }

    return console.log(NO_AVAILABLE_LINTER)
  } catch (err){
    console.log(err, 'in lint.fn')

    return false
  }
}

exports.lintFn = lintFn
exports.execPrettier = execPrettier
