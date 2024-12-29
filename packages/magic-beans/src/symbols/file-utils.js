// file-utils.js
const vscode = require('vscode')
const { any } = require('rambdax')
const { configAnt } = require('../ants/config')

const FORBIDDEN_PATTERN = [ '.spec.', '.test.' ]
const SYMBOLS_LIST_ALLOWED_EXTENSIONS = configAnt('SYMBOLS_LIST_ALLOWED_EXTENSIONS')
const HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY = 3000

const fileIsReportable = file => {
  const isForbidden = any(pattern => file.path.includes(pattern), FORBIDDEN_PATTERN)
  return (
    !isForbidden &&
    any(extension => file.path.endsWith(extension), SYMBOLS_LIST_ALLOWED_EXTENSIONS)
  )
}

async function getReportableFiles(folder = 'src'){
  const dir = vscode.workspace.workspaceFolders[ 0 ].uri.path + '/' + folder
  const pattern = new vscode.RelativePattern(dir, '**/*')
  const files = await vscode.workspace.findFiles(
    pattern,
    '**/node_modules/**',
    HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY
  )
  return files.filter(fileIsReportable)
}

module.exports = {
  getReportableFiles
}
