const vscode = require('vscode')
const fs = require('fs')
const { mapAsync } = require('rambdax')

const HARD_LIMIT_OF_FILES_TO_PROCESS = 500

async function getAllFiles() {
  let dir = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const pattern = new vscode.RelativePattern(dir, '**/*.js')
  const files = await vscode.workspace.findFiles(pattern, '**/node_modules/**', HARD_LIMIT_OF_FILES_TO_PROCESS)
  
  return files;
}

async function generateReport(files) {
  let result = await mapAsync(async (file) => {
    let symbols = commands.executeCommand(
      'vscode.executeDocumentSymbolProvider',
      file
    )
  }, files)
  return result
}

async function createTempFile() {
  let dir = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const output = `${ __dirname }/temp.txt`

  // Write data to the temporary file
  await fs.writeFile(output, 'hello world\n');

  // Open the temporary file in the editor
  const document = await vscode.workspace.openTextDocument(output);
  await vscode.window.showTextDocument(output);
  1
}

async function symbolsList(){
  1
  await getAllFiles()
    await createTempFile()
  1
}

exports.symbolsList = symbolsList
