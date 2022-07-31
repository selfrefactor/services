NODE_ENV = 'DEBUG'
process.env.LINT_FN_DEBUG = 'ON'
const { test,replace,mapAsync, mapFastAsync } = require('rambdax')
const { readFile, writeFile } = require('fs-extra')
const { lintFn, execPrettier,  } = require('../lintFn')
const { ANGULAR, TS_PROVE, JS, TS, JEST, ANGULAR_HTML } = require('../constants')

const commonReplacer = (fileContent, {replacer}) => {
  console.log(replacer, `replacer`)
  const havePattern = fileContent.includes(replacer.old)
  if(!havePattern) return false

  return replace(replacer.old, replacer.new,fileContent)
}

async function singleProve(lintFnInput){
  const initialFileContent = (await readFile(lintFnInput.filePath)).toString()
  const newContent = commonReplacer(initialFileContent, lintFnInput)
  if(!newContent) return {linted: false, mode: lintFnInput.mode, error: 'wrong replacer'}

  await writeFile(lintFnInput.filePath, newContent)
  const lintResult = await lintFn(lintFnInput)

  const lintedFileContent = (await readFile(lintFnInput.filePath)).toString()

  if(initialFileContent !== lintedFileContent){
    return {linted: false, mode: lintFnInput.mode, error: 'unexpected change'}
  }

  return {linted: true, mode: lintFnInput.mode, lintResult}
}

const proveList = [
  {filePath: ANGULAR, mode: 'angular', replacer: {old: '@Component({', new: `   @Component({`}}
]

void async function automaticProve(){
  const result = await mapAsync(singleProve, proveList)
  console.log(result, `result`)
}()
