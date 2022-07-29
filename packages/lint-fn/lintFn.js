const { commandFactory } = require('./_modules/commandFactory')
const { execPrettier } = require('./_modules/execPrettier')
const { getEslintPath } = require('./_modules/getEslintPath')
const { debugFlag, DIR } = require('./_modules/spawnCommand')
const { execCommand } = require('./_modules/exec')
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
      const command = `${ lintJest.command } ${ lintJest.inputs.join(' ') }`
      if(debug){
        console.log(`lintJest.command`, command)
      }
      const result= await execCommand({cwd: DIR, command})

      return result
      // return spawn(lintJest.command, lintJest.inputs)
    }

    if (filePath.endsWith('.js')){
      const command = `${ lintDefault.command } ${ lintDefault.inputs.join(' ') }`
      if(debug)        console.log(command)
      const result= await execCommand({cwd: DIR, command})

      return result
      // return spawn(lintDefault.command, lintDefault.inputs)
    }

    return console.log(NO_AVAILABLE_LINTER)
  } catch (err){
    console.log(err, 'in lint.fn')

    return false
  }
}

exports.lintFn = lintFn
exports.execPrettier = execPrettier
