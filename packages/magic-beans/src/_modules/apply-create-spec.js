const { readFileSync } = require('fs')
const { remove, match } = require('rambdax')
const { specTemplate } = require('./spec-template')

function getFirstExportedFunction(fileContent){
  const [matchedTypescript] = match(/export\s+(?:async\s+)?function\s+(\w+)/g, fileContent)
  const [matchedJavascript] = match(/exports\.(\w+)\s*=/g, fileContent)

  if(!matchedTypescript && !matchedJavascript) return {success: false}

  if(
    matchedJavascript
  ){
    return {
      success: true,
      firstExportedFunction: remove(['exports.', '='], matchedJavascript).trim(),
      isJavascript: true,
    }
  }

  const isAsync = matchedTypescript.includes('async')

  return {
    success: true,
    firstExportedFunction: remove(['export', 'function', 'async'], matchedTypescript).trim(),
    isAsync,
    isJavascript: false,
  }
}

function applyCreateSpec(filePath, fileName){
  const content = readFileSync(filePath).toString()
  let {success, firstExportedFunction, isJavascript, isAsync} = getFirstExportedFunction(content)
  if(!success) return

  return specTemplate({
    isAsync,
    isJavascript,
    methodName : firstExportedFunction,
    fileName,
  })
}

exports.applyCreateSpec = applyCreateSpec
