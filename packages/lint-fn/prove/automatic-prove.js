NODE_ENV = 'DEBUG'
process.env.LINT_FN_DEBUG = 'ON'
const { test,replace,mapAsync, mapFastAsync } = require('rambdax')
const { readFile } = require('fs-extra')
const { lintFn, execPrettier,  } = require('../lintFn')
const { ANGULAR, TS_PROVE, JS, TS, JEST, ANGULAR_HTML } = require('../constants')

const commonReplacer = (fileContent) => {
  console.log(fileContent, `fileContent`)
  const havePattern = test(/\t/, fileContent)
  console.log(havePattern, `havePattern`)
}

async function singleProve(lintFnInput, replacer = commonReplacer){
  const fileContent = (await readFile(lintFnInput.filePath)).toString()
  const newContent = commonReplacer(fileContent)
}

const proveList = [
  {filePath: ANGULAR}
]

void async function automaticProve(){
  const result = await mapAsync(singleProve, proveList)
  console.log(result, `result`)
}()
