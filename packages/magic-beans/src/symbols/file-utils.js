const vscode = require('vscode')
const { none } = require('rambdax')
const { configAnt } = require('../ants/config')

const FORBIDDEN_PATTERN = [ '.spec.', '.test.' ]
const SYMBOLS_LIST_ALLOWED_EXTENSIONS = configAnt('SYMBOLS_LIST_ALLOWED_EXTENSIONS')
const HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY = 3000

const fileIsReportable = file => {
  return none(pattern => file.path.includes(pattern), FORBIDDEN_PATTERN)
}

async function getReportableFiles(parentFolderPath){
	const folder = vscode.workspace.workspaceFolders?.[0];
	let extensionsPattern = SYMBOLS_LIST_ALLOWED_EXTENSIONS.join(',')
  const pattern = new vscode.RelativePattern(folder, `${parentFolderPath}/**/*.{${extensionsPattern}}`);
  const files = await vscode.workspace.findFiles(pattern, '**/node_modules/**', HARD_LIMIT_OF_FILES_TO_PROCESS_INITIALLY);

  let result = files.filter(fileIsReportable)
	return result
}

module.exports = {
  getReportableFiles
}
