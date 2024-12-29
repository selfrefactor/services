const vscode = require('vscode')
const { any, mapAsync } = require('rambdax')
const { isKebabCase, isDotCase, isSnakeCase, isConstantCase, isPascalCase, isCamelCase } = require('string-fn')
const { configAnt } = require('../ants/config')

const FORBIDDEN_PATTERN = [ '.spec.', '.test.' ]
const SYMBOLS_LIST_ALLOWED_EXTENSIONS = configAnt('SYMBOLS_LIST_ALLOWED_EXTENSIONS')
const HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY = 3000
const MAX_LEVEL = 9

const { getReportableFiles } = require('./file-utils')
const { generateReportObject } = require('./report-utils')
const { sortNamesList } = require('./sort-utils')

const skippedKinds = [ 1, 13 ]
const skippedByRegex = []
const skippedByKind = []

function getFileReport(symbols, prev = {}, level = 0){
  if (!symbols.length === 0) return prev
  symbols.forEach(symbol => {
    const { children, kind, name } = symbol
    if (skippedKinds.includes(kind)){
      skippedByKind.push({ kind, name })
      return
    } 

    if (prev[ level ] === undefined) prev[ level ] = []
    const passRegex = new RegExp('^[a-zA-Z0-9_]+$')
    if (!passRegex.test(name)){
      skippedByRegex.push({ kind, name })
      return
    }
    prev[ level ].push(name)
    if (children.length === 0 || level + 1 === MAX_LEVEL) return
    prev = getFileReport(children, prev, level + 1)
  })

  return prev
}

function getNamePattern(text){
  if(isConstantCase(text)) return 6
  if(isPascalCase(text)) return 5
  if(isCamelCase(text)) return 4
  if(isSnakeCase(text)) return 3
  if(isDotCase(text)) return 2
  if(isKebabCase(text)) return 1
  return 0
}

module.exports = {
  getReportableFiles,
  generateReportObject,
  sortNamesList
}
