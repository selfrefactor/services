const vscode = require('vscode')
const { any, remove } = require('rambdax')
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

async function getReportableFiles(parentFolderPath){
	// let projectFolder = vscode.workspace.workspaceFolders[ 0 ].uri.path
	// let relativeFolder = remove(`${ projectFolder }/`, parentFolderPath)
  const pattern = new vscode.RelativePattern(parentFolderPath, '**/*')
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
