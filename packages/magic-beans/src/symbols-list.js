const fs = require('fs')
const vscode = require('vscode')
const {
  any,
  last,
  mapAsync,
  mapParallelAsync,
  piped,
  range,
  take,
  uniq,
  flatten,
} = require('rambdax')
const { configAnt } = require('./ants/config')
const { requestRandomFile } = require('./random-file')
const {  isKebabCase, 
  isDotCase, isSnakeCase, isConstantCase,
  isPascalCase,
  isCamelCase
} = require('string-fn')


const DEBUG_FILE = false
// const DEBUG_FILE = 'src/foo.ts'
const FORBIDDEN_PATTERN = [ '.spec.', '.test.' ]
const DEBUG_MODE = false
const DEBUG_PATTERN = 'list.tsx'
const SYMBOLS_LIST_ALLOWED_EXTENSIONS = configAnt('SYMBOLS_LIST_ALLOWED_EXTENSIONS')

const fileIsReportable = file => {
  if (DEBUG_MODE) return file.path.includes(DEBUG_PATTERN)

  const isForbidden = any(pattern => file.path.includes(pattern),
    FORBIDDEN_PATTERN)

  return (
    !isForbidden &&
    any(extension => file.path.endsWith(extension),
      SYMBOLS_LIST_ALLOWED_EXTENSIONS)
  )
}

const HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY = 3000
const HARD_LIMIT_OF_FILES_TO_PROCESS = 800
const MAX_LEVEL = 9
const MAX_SYMBOLS_PER_LEVEL = 600

async function getReportableFiles(folder = 'src'){
  const dir = vscode.workspace.workspaceFolders[ 0 ].uri.path + '/' + folder
  const pattern = new vscode.RelativePattern(dir, '**/*')
  const files = await vscode.workspace.findFiles(
    pattern,
    '**/node_modules/**',
    HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY
  )
  const filtered = files.filter(fileIsReportable)

  return filtered
}

const skippedKinds = [ 1, 13 ]
const skippedByRegex = []
const skippedByKind = []

function getFileReport(
  symbols, prev = {}, level = 0
){
  if (!symbols.length === 0) return prev
  symbols.forEach(symbol => {
    const { children, kind, name } = symbol
    if (skippedKinds.includes(kind)){
      if(!DEBUG_MODE) return

      skippedByKind.push({
        kind,
        name,
      })
      return
    } 

    if (prev[ level ] === undefined) prev[ level ] = []
    const passRegex = new RegExp('^[a-zA-Z0-9_]+$')
    if (!passRegex.test(name)){
      if(!DEBUG_MODE) return
      skippedByRegex.push({
        kind,
        name,
      })

      return
    }
    prev[ level ].push(name)
    if (children.length === 0 || level + 1 === MAX_LEVEL) return
    const prevResult = getFileReport(
      children, prev, level + 1
    )
    prev = prevResult
  })

  return prev
}

async function generateReportObject(files){
  let reportObject = {}
  await mapAsync(async file => {
    const symbols = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider',
      file)
    if (!symbols) return false
    reportObject = getFileReport(symbols, reportObject)
  }, files)

  return reportObject
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

function sortNamesList(a, b){
  const aPattern = getNamePattern(a)
  const bPattern = getNamePattern(b)
  if(aPattern > bPattern) return -1
  if(aPattern < bPattern) return 1
  return a > b ? 1 : -1
}

async function generateAndShowReport(reportObject){
  let output = ''
  range(0, MAX_LEVEL).forEach(level => {
    if (reportObject[ level ] === undefined) return
    const namesList = piped(
      reportObject[ level ],
      uniq,
      take(MAX_SYMBOLS_PER_LEVEL)
    )
    namesList.sort(sortNamesList)

    if (namesList.length > 0){
      output += `\n\nLEVEL ${ level } \n\n`
      output += namesList.join('\n')
    }
  })
  if(!output) return
  const projectName = last(vscode.workspace.workspaceFolders[ 0 ].uri.path.split('/'))
  const outputLocation = `${ __dirname }/symbols-list-${ projectName }.txt`
  if (fs.existsSync(outputLocation)) fs.unlinkSync(outputLocation)

  fs.writeFileSync(outputLocation, Buffer.from(output, 'utf8'))

  const uri = vscode.Uri.file(outputLocation)
  vscode.workspace.openTextDocument(uri).then(doc => {
    vscode.window.showTextDocument(doc)
  })
}

let isShown = false

const getReportableFilesFn = async folders => {
  const files = await mapParallelAsync(async folder => getReportableFiles(folder),
    folders)

  let result = take(HARD_LIMIT_OF_FILES_TO_PROCESS, flatten(files))
  if(!DEBUG_FILE) return result

  result = result.filter(file => file.path.includes(DEBUG_FILE))

  return result
}

async function symbolsList(){
  if (isShown){
    requestRandomFile()

    return
  }
  try {
    const reportableFiles = await getReportableFilesFn([
      'src',
      'packages',
      'source',
    ])
    const reportObject = await generateReportObject(reportableFiles)
    await generateAndShowReport(reportObject)
    isShown = true
  } catch (e){
    console.log(e)
  }
}

exports.symbolsList = symbolsList
