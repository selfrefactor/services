NODE_ENV = 'DEBUG'
process.env.LINT_FN_DEBUG = 'ON'
const { test,replace,mapAsync, mapFastAsync } = require('rambdax')
const { readFile, writeFile } = require('fs-extra')
const { lintFn, execPrettier } = require('../lintFn')
const { ANGULAR, TS_PROVE, JS, TS, JEST, ANGULAR_HTML, DEFAULT_JS } = require('../constants')

const debug = false

const commonReplacer = (fileContent, {replacer}) => {
  console.log(replacer, `replacer`)
  const havePattern = fileContent.includes(replacer.old)
  if(!havePattern) return false

  return replace(replacer.old, replacer.new,fileContent)
}

async function singleProve(lintFnOptions){
  const lintFnInput = {
    ...lintFnOptions,
    debug
  }
  if(!lintFnInput.replacer){
    const lintResult = await lintFn(lintFnInput)

    return {linted: 'no replacer mode', mode: lintFnInput.mode, lintResult}
  }

  const initialFileContent = (await readFile(lintFnInput.filePath)).toString()
  const newContent = commonReplacer(initialFileContent, lintFnInput)
  if(!newContent) return {linted: false, mode: lintFnInput.mode, error: 'wrong replacer'}

  await writeFile(lintFnInput.filePath, newContent)
  const lintResult = execPrettierFlag ? await execPrettier(lintFnInput) : await lintFn(lintFnInput)

  const lintedFileContent = (await readFile(lintFnInput.filePath)).toString()

  if(initialFileContent !== lintedFileContent){
    return {linted: false, mode: lintFnInput.mode, error: 'unexpected change'}
  }

  return {linted: true, mode: lintFnInput.mode, lintResult}
}

const injectOptions = '--print-width 34'

const angular= {filePath: ANGULAR, mode: 'angular', replacer: {old: '@Component({', new: `   @Component({`}}
const forceTS= {filePath: TS, prettierSpecialCase: 'local',   forceTypescript: true, mode: 'forceTS', replacer: {old: 'function reduceStopper', new: `function     reduceStopper`}}
const errorMode= {filePath: TS_PROVE, mode: 'error', prettierSpecialCase: 'outer'}

const defaultMode = {filePath: DEFAULT_JS, mode: 'default', replacer: {old: 'isFalsy(input)', new: `isFalsy(   input    )`}}
const execPrettierMode = {filePath: DEFAULT_JS, mode: 'execPrettier', replacer: {old: 'return pipe.apply', new: `return       pipe.apply`}, execPrettierFlag: true, injectOptions}

const htmlMode = {filePath: DEFAULT_JS, mode: 'html', replacer: {old: '<grid>', new: `       <grid>`}, execPrettierFlag: true, injectOptions}

const proveList = [
  angular,
  forceTS,
  defaultMode,
  errorMode,
  htmlMode,
  execPrettierMode
]

void async function automaticProve(){
  const result = await mapAsync(singleProve, proveList)
  console.log(result, `result`)
}()
