NODE_ENV = 'DEBUG'
process.env.LINT_FN_DEBUG = 'ON'
const {
  ANGULAR,
  TS_PROVE,
  JS,
  TS,
  JEST,
  ANGULAR_HTML,
} = require('../constants')
const { lintFn, execPrettier } = require('../lintFn')
const { readFile, writeFile } = require('fs-extra')
const { replace, mapAsync, mapFastAsync } = require('rambdax')

const debug = false

const commonReplacer = (fileContent, { replacer }) => {
  console.log(replacer, 'replacer')
  const havePattern = fileContent.includes(replacer.old)
  if (!havePattern) return false

  return replace(
    replacer.old, replacer.new, fileContent
  )
}

async function singleProve(lintFnOptions){
  const lintFnInput = {
    ...lintFnOptions,
    debug,
  }
  if (!lintFnInput.replacer){
    const lintResult = await lintFn(lintFnInput)

    return {
      linted : 'no replacer mode',
      mode   : lintFnInput.mode,
      lintResult,
    }
  }

  const initialFileContent = (
    await readFile(lintFnInput.filePath)
  ).toString()
  const newContent = commonReplacer(initialFileContent, lintFnInput)
  if (!newContent)
    return {
      linted : false,
      mode   : lintFnInput.mode,
      error  : 'wrong replacer',
    }

  await writeFile(lintFnInput.filePath, newContent)
  const lintResult = execPrettierFlag ?
    await execPrettier(lintFnInput) :
    await lintFn(lintFnInput)

  const lintedFileContent = (await readFile(lintFnInput.filePath)).toString()

  if (initialFileContent !== lintedFileContent){
    return {
      linted : false,
      mode   : lintFnInput.mode,
      error  : 'unexpected change',
    }
  }

  return {
    linted : true,
    mode   : lintFnInput.mode,
    lintResult,
  }
}

const injectOptions = '--print-width 34'

const angular = {
  filePath : ANGULAR,
  mode     : 'angular',
  replacer : {
    old : '@Component({',
    new : '   @Component({',
  },
}
const forceTS = {
  filePath            : TS,
  prettierSpecialCase : 'local',
  forceTypescript     : true,
  mode                : 'forceTS',
  replacer            : {
    old : 'function reduceStopper',
    new : 'function     reduceStopper',
  },
}
const errorMode = {
  filePath            : TS_PROVE,
  mode                : 'error',
  prettierSpecialCase : 'outer',
}

const defaultMode = {
  filePath : JS,
  mode     : 'default',
  replacer : {
    old : 'isFalsy(input)',
    new : 'isFalsy(   input    )',
  },
}
const jest = {
  filePath : JEST,
  mode     : 'jest',
  replacer : {
    old : 'map(add(10))',
    new : 'map(   add(  10   )   )',
  },
}
const tsProve = {
  filePath : TS_PROVE,
  mode     : 'tsProve',
  replacer : {
    old : 'beforeEnd({',
    new : 'beforeEnd   (   {',
  },
}
const execPrettierMode = {
  filePath : DEFAULT_JS,
  mode     : 'execPrettier',
  replacer : {
    old : 'return pipe.apply',
    new : 'return       pipe.apply',
  },
  execPrettierFlag : true,
  injectOptions,
}

const htmlMode = {
  filePath : ANGULAR_HTML,
  mode     : 'html',
  replacer : {
    old : '<grid>',
    new : '       <grid>',
  },
  execPrettierFlag : true,
  injectOptions,
}

const proveList = [
  angular,
  defaultMode,
  errorMode,
  execPrettierMode,
  forceTS,
  htmlMode,
  jest,
  tsProve,
]

void (async function automaticProve(){
  const result = await mapFastAsync(singleProve, proveList)
  console.log(result, 'result')
})()
