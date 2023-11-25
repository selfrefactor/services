const fs = require('fs')
const vscode = require('vscode')
const { any, last, mapAsync, remove } = require('rambdax')
const { configAnt } = require('./ants/config')

const FORBIDDEN_PATTERN = [ '.spec.', '.test.' ]
const DEBUG_MODE = true
const DEBUG_PATTERN =
  'src/handlers/aggregation/processors/parent-processor.ts'
const SYMBOLS_LIST_ALLOWED_EXTENSIONS = configAnt('SYMBOLS_LIST_ALLOWED_EXTENSIONS')

const fileIsReportable = file => {
  if (DEBUG_MODE)
    return file.path.includes(DEBUG_PATTERN)

  const isForbidden = any(pattern => file.path.includes(pattern),
    FORBIDDEN_PATTERN)

  return (
    !isForbidden &&
    any(extension => file.path.endsWith(extension),
      SYMBOLS_LIST_ALLOWED_EXTENSIONS)
  )
}

const HARD_LIMIT_OF_FILES_TO_PROCESS = 500

async function getReportableFiles(){
  const dir = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const pattern = new vscode.RelativePattern(dir, '**/*')
  const files = await vscode.workspace.findFiles(
    pattern,
    '**/node_modules/**',
    HARD_LIMIT_OF_FILES_TO_PROCESS
  )
  const filtered = files.filter(fileIsReportable)

  return filtered
}

async function generateReport(files){
  const dir = vscode.workspace.workspaceFolders[ 0 ].uri.path

  const result = await mapAsync(async file => {
    const symbols = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider',
      file)
    if (!symbols) return false

    const details = symbols
      .map(({ kind, name }) => ({
        kind,
        name,
      }))
      .filter(({ kind }) => kind !== 13)
    const detailsx = symbols
      .map(({ kind, name }) => ({
        kind,
        name,
      }))
      .filter(({ kind }) => kind === 13)

    const filePath = remove(dir, file.path)

    return {
      details,
      filePath,
    }
  }, files)

  return result.filter(Boolean)
}

async function showReport(reportRawData){
  const lines = []
  reportRawData.forEach(singleFileReport => {
    singleFileReport.details.forEach(({ kind, name }) => {
      lines.push(`${ name } - ${ singleFileReport.filePath } - ${ kind }`)
    })
  })
  lines.sort()
  const projectName = last(vscode.workspace.workspaceFolders[ 0 ].uri.path.split('/'))
  const outputLocation = `${ __dirname }/symbols-list-${ projectName }.txt`
  const output = lines.join('\n')
  if (fs.existsSync(outputLocation)) fs.unlinkSync(outputLocation)

  fs.writeFileSync(outputLocation, Buffer.from(output, 'utf8'))

  const uri = vscode.Uri.file(outputLocation)
  vscode.workspace.openTextDocument(uri).then(doc => {
    vscode.window.showTextDocument(doc)
  })
}

async function symbolsList(){
  try {
    const reportableFiles = await getReportableFiles()
    const report = await generateReport(reportableFiles)
    await showReport(report)
  } catch (e){
    console.log(e)
  }
}

exports.symbolsList = symbolsList
